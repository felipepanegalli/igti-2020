export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'My Bank API Documentation',
    version: '1.0.0',
    title: 'My Bank API',
  },
  host: 'localhost:3333',
  basePath: '/',
  tags: [
    {
      name: 'account',
      description: 'Everything about your Account',
    },
  ],
  paths: {
    '/accounts/': {
      get: {
        tags: ['account'],
        summary: 'Retrieve all accounts',
        description: 'Returns all accounts',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Account',
              },
            },
          },
          '400': {
            description: 'error database operation',
          },
        },
      },
      post: {
        tags: ['account'],
        summary: 'Add a new account',
        description: 'Add new client in bank',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account object',
            required: true,
            schema: {
              type: 'object',
              required: ['name', 'balance'],
              properties: {
                name: {
                  type: 'string',
                  example: 'João da Silva',
                },
                balance: {
                  type: 'number',
                  example: '780.00',
                },
              },
            },
          },
        ],
        responses: {
          '201': {
            description: 'Account created',
          },
          '400': {
            description: 'Error occured',
          },
        },
      },
      put: {
        tags: ['account'],
        summary: 'Update an existing account',
        description: '',
        operationId: 'updateAccount',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Person info need to update the account',
            required: true,
            schema: {
              $ref: '#/definitions/Account',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Account updated',
          },
          '400': {
            description: 'Invalid ID supplied',
          },
          '404': {
            description: 'Account not found',
          },
        },
      },
    },
    '/accounts/{id}/': {
      get: {
        tags: ['account'],
        summary: 'Get account by id',
        description: 'Get account by id',
        operationId: 'findAccountById',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Id to filter by',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Account',
              },
            },
          },
          '400': {
            description: 'error database operation',
          },
        },
      },
      delete: {
        tags: ['account'],
        summary: 'Delete account by id',
        description: 'Delete account by id',
        operationId: 'deleteAccountById',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Id to filter by',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Account',
              },
            },
          },
          '400': {
            description: 'error database operation',
          },
        },
      },
    },
    '/accounts/transaction/': {
      post: {
        tags: ['account'],
        summary: 'Transaction account values',
        description: 'Deposit ou withdraw account values',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account object',
            required: true,
            schema: {
              $ref: '#/definitions/Transaction',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Transection succefully',
          },
          '400': {
            description: 'Error occured',
          },
        },
      },
    },
  },
  definitions: {
    Account: {
      type: 'object',
      required: ['name', 'balance'],
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        name: {
          type: 'string',
          example: 'João da Silva',
        },
        balance: {
          type: 'number',
          format: 'float',
          example: 780.0,
        },
      },
    },
    Transaction: {
      type: 'object',
      required: ['id', 'value'],
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        value: {
          type: 'number',
          format: 'float',
          example: 780.0,
        },
      },
    },
  },
};
