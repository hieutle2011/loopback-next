// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/typeorm
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Context, inject, Injection, ResolutionSession} from '@loopback/core';
import {QueryRunner} from 'typeorm';
import {TypeOrmBindings} from '../keys';

export namespace typeorm {
  export function connection(connectionName?: string) {
    return inject(
      '',
      {decorator: '@typeormConnection'},
      async (
        ctx: Context,
        injection: Readonly<Injection>,
        session: ResolutionSession,
      ) => {
        return getConnection(ctx, connectionName);
      },
    );
  }

  export function entityManager(
    connectionName?: string,
    queryRunner?: QueryRunner,
  ) {
    return inject(
      '',
      {decorator: '@typeormEntityManager'},
      async (
        ctx: Context,
        injection: Readonly<Injection>,
        session: ResolutionSession,
      ) => {
        const conn = await getConnection(ctx, connectionName);
        return conn.createEntityManager(queryRunner);
      },
    );
  }

  export function repository(entity: Function, connectionName?: string) {
    return inject(
      '',
      {decorator: '@typeormRepository'},
      async (
        ctx: Context,
        injection: Readonly<Injection>,
        session: ResolutionSession,
      ) => {
        const conn = await getConnection(ctx, connectionName);
        return conn.getRepository(entity);
      },
    );
  }
}

/**
 * Get a connection by name
 * @param ctx - Context object
 * @param connectionName - Optional connection name
 */
async function getConnection(ctx: Context, connectionName?: string) {
  const connections = await ctx.get(TypeOrmBindings.CONNECTIONS);
  return connections.manager.get(connectionName);
}
