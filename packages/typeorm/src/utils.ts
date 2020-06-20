// Copyright IBM Corp. 2017,2020. All Rights Reserved.
// Node module: @loopback/repository
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {JsonSchemaOptions, SchemaRef} from '@loopback/rest';

/**
 * Describe the provided Model as a reference to a definition shared by multiple
 * endpoints. The definition is included in the returned schema.
 *
 * @example
 *
 * ```ts
{
  "$ref": "#/definitions/User",
  "definitions": {
    "User": {
      "title": "User",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "additionalProperties": false
    }
  }
}
{
  "$ref": "#/definitions/NewUser",
  "definitions": {
    "NewUser": {
      "title": "NewUser",
      "description": "(tsType: Omit<User, 'id'>, schemaOptions: { title: 'NewUser', exclude: [ 'id' ] })",
      "properties": {
        "name": {
          "type": "string"
        }
      },
      "additionalProperties": false
    }
  }
}
{
  "$ref": "#/definitions/UserWithRelations",
  "definitions": {
    "UserWithRelations": {
      "title": "UserWithRelations",
      "description": "(tsType: UserWithRelations, schemaOptions: { includeRelations: true })",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "additionalProperties": false
    }
  }
}
{
  "$ref": "#/definitions/UserPartial",
  "definitions": {
    "UserPartial": {
      "title": "UserPartial",
      "description": "(tsType: Partial<User>, schemaOptions: { partial: true })",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "additionalProperties": false
    }
  }
}
{
  "$ref": "#/definitions/UserWithRelations",
  "definitions": {
    "UserWithRelations": {
      "title": "UserWithRelations",
      "description": "(tsType: UserWithRelations, schemaOptions: { includeRelations: true })",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "additionalProperties": false
    }
  }
}
{
  "$ref": "#/definitions/UserPartial",
  "definitions": {
    "UserPartial": {
      "title": "UserPartial",
      "description": "(tsType: Partial<User>, schemaOptions: { partial: true })",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        }
      },
      "additionalProperties": false
    }
  }
}
 * ```
 *
 * @param entityCtor - The entity constructor (e.g. `Product`)
 * @param options - Additional options
 */
export function getModelSchemaRef<T extends object>(
  entityCtor: Function & {prototype: T},
  options?: JsonSchemaOptions<T>,
): SchemaRef {
  // const jsonSchema = getJsonSchemaRef(entityCtor, options);
  // return jsonToSchemaObject(jsonSchema) as SchemaRef;
  return {
    $ref: '',
    definitions: {},
  };
}

// /**
//  * Describe the provided Model as a reference to a definition shared by multiple
//  * endpoints. The definition is included in the returned schema.
//  *
//  * @example
//  *
//  * ```ts
//  * const schema = {
//  *   $ref: '/definitions/Product',
//  *   definitions: {
//  *     Product: {
//  *       title: 'Product',
//  *       properties: {
//  *         // etc.
//  *       }
//  *     }
//  *   }
//  * }
//  * ```
//  *
//  * @param modelCtor - The model constructor (e.g. `Product`)
//  * @param options - Additional options
//  */
// export function getJsonSchemaRef<T extends object>(
//   modelCtor: Function & {prototype: T},
//   options?: JsonSchemaOptions<T>,
// ): JsonSchema {
//   const schemaWithDefinitions = getJsonSchema(modelCtor, options);
//   const key = schemaWithDefinitions.title;

//   // ctor is not a model
//   if (!key) return schemaWithDefinitions;

//   const definitions = Object.assign({}, schemaWithDefinitions.definitions);
//   const schema = Object.assign({}, schemaWithDefinitions);
//   delete schema.definitions;
//   definitions[key] = schema;

//   return {
//     $ref: `#/definitions/${key}`,
//     definitions,
//   };
// }

// /**
//  * Gets the JSON Schema of a TypeScript model/class by seeing if one exists
//  * in a cache. If not, one is generated and then cached.
//  * @param ctor - Constructor of class to get JSON Schema from
//  */
// export function getJsonSchema<T extends object>(
//   ctor: Function & {prototype: T},
//   options?: JsonSchemaOptions<T>,
// ): JsonSchema {
//   // In the near future the metadata will be an object with
//   // different titles as keys
//   const cached = MetadataInspector.getClassMetadata(JSON_SCHEMA_KEY, ctor);
//   const key = buildModelCacheKey(options);
//   let schema = cached?.[key];

//   if (!schema) {
//     // Create new json schema from model
//     // if not found in cache for specific key
//     schema = modelToJsonSchema(ctor, options);
//     if (cached) {
//       // Add a new key to the cached schema of the model
//       cached[key] = schema;
//     } else {
//       // Define new metadata and set in cache
//       MetadataInspector.defineMetadata(
//         JSON_SCHEMA_KEY.key,
//         {[key]: schema},
//         ctor,
//       );
//     }
//   }

//   return schema;
// }
