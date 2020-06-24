// Copyright IBM Corp. 2017,2020. All Rights Reserved.
// Node module: @loopback/typeorm
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {JsonSchemaOptions, SchemaRef} from '@loopback/rest';

/**
 * Describe the provided Entity as a reference to a definition shared by multiple
 * endpoints. The definition is included in the returned schema.
 *
 * @param entityCtor - The entity constructor (e.g. `Product`)
 * @param options - Additional options
 */
export function getModelSchemaRef<T extends object>(
  entityCtor: Function & {prototype: T},
  options?: JsonSchemaOptions<T>,
): SchemaRef {
  // TODO: generate SchemaRef from entityCtor
  return {
    $ref: '',
    definitions: {},
  };
}
