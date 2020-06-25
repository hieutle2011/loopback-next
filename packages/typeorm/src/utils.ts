// Copyright IBM Corp. 2017,2020. All Rights Reserved.
// Node module: @loopback/typeorm
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  JsonSchemaOptions,
  ReferenceObject,
  SchemaObject,
} from '@loopback/openapi-v3';
import {getMetadataArgsStorage} from 'typeorm';
import {ColumnType} from 'typeorm/driver/types/ColumnTypes';
import {ColumnMetadataArgs} from 'typeorm/metadata-args/ColumnMetadataArgs';

const ModelSchemaCache = new WeakMap();

/**
 * Describe the provided Entity as a reference to a definition shared by multiple
 * endpoints. The definition is included in the returned schema.
 *
 * @param modelCtor - The entity constructor (e.g. `Product`)
 * @param options - Additional options
 */
export function getModelSchema<T extends object>(
  modelCtor: Function & {prototype: T},
  options?: JsonSchemaOptions<T>,
): SchemaObject {
  const cached = ModelSchemaCache.get(modelCtor);
  if (cached) {
    return cached;
  } else {
    const allColumns: ColumnMetadataArgs[] = getMetadataArgsStorage().columns;
    const modelColumns = allColumns.filter(col => col.target === modelCtor);

    const properties: propertyType = {};
    for (let col of modelColumns) {
      // Skip @PrimaryGeneratedColumn
      if (!col.options.primary) {
        properties[col.propertyName] = {
          type: getStringifiedType(col.options.type as ColumnType),
        };
      }
    }

    const schema: SchemaObject = {
      title: modelCtor.name,
      properties,
    };

    ModelSchemaCache.set(modelCtor, schema);
    return schema;
  }
}

export type propertyType = {
  [propertyName: string]: SchemaObject | ReferenceObject;
};

// TODO: identify other data types
function getStringifiedType(func: ColumnType): string {
  if (func === Number) {
    return 'number';
  } else if (func === String) {
    return 'string';
  } else if (func === Boolean) {
    return 'boolean';
  } else {
    throw new Error(
      `Type conversion of ${func} to OpenAPI format not implemented.`,
    );
  }
}
