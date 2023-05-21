export const OPEN_API_CONSTANT = {
  version: process.env.npm_package_version,
  title: 'Antivirus REST API',
  description: 'A list of Antivirus API endpoints',
  logo: {
    url: '#',
    backgroundColor: '#F0F0F0',
  },
  termsOfServiceUrl: '',
  license: {
    title: 'Usage License',
    url: '#',
  },
  externalDoc: {
    title: 'Getting started',
    url: '',
  },
  contact: {
    title: 'iamaul',
    email: 'iamaul@hotmail.com',
    url: '#',
  },
  authorizationType: {
    Token: 'Authorization Bearer Token',
  },
  modules: {
    AUTH: {
      tag: 'Auth',
      endPoints: {
        CREATE_AUTH: {
          ApiOperation: {
            title: 'Create Auth',
            summary: 'Create an authentication Firebase account',
          },
          ApiOkResponse: {
            description: 'Successful Create Auth response',
          },
          ApiBadRequestResponse: {
            description: 'Bad Request',
          },
          ApiInternalServerErrorResponse: {
            description: 'Internal server error',
          },
        },
      },
    },
    USER: {
      tag: 'User',
      endPoints: {
        CREATE_USER: {
          ApiOperation: {
            title: 'Create User',
            summary: 'Create a user',
          },
          ApiOkResponse: {
            description: 'Successful Create User response',
          },
          ApiBadRequestResponse: {
            description: 'Bad Request',
          },
          ApiUnauthorized: {
            description: 'Unauthorized',
          },
          ApiInternalServerErrorResponse: {
            description: 'Internal server error',
          },
        },
        GET_USERS: {
          ApiOperation: {
            title: 'Get Users',
            summary: 'Get all of the users',
          },
          ApiOkResponse: {
            description: 'Successful Get Users response',
          },
          ApiBadRequestResponse: {
            description: 'Bad Request',
          },
          ApiUnauthorized: {
            description: 'Unauthorized',
          },
          ApiInternalServerErrorResponse: {
            description: 'Internal server error',
          },
        },
        GET_USER: {
          ApiOperation: {
            title: 'Get User',
            summary: 'Find user by id',
          },
          ApiOkResponse: {
            description: 'Successful Get User response',
          },
          ApiBadRequestResponse: {
            description: 'Bad Request',
          },
          ApiUnauthorized: {
            description: 'Unauthorized',
          },
          ApiNotFoundResponse: {
            description: 'User Not Found',
          },
          ApiInternalServerErrorResponse: {
            description: 'Internal server error',
          },
        },
        CREATE_USER_METADATA: {
          ApiOperation: {
            title: 'Create User Metadata',
            summary: 'Create a user metadata',
          },
          ApiOkResponse: {
            description: 'Successful Create User Metadata response',
          },
          ApiBadRequestResponse: {
            description: 'Bad Request',
          },
          ApiUnauthorized: {
            description: 'Unauthorized',
          },
          ApiInternalServerErrorResponse: {
            description: 'Internal server error',
          },
        },
        UPDATE_USER_METADATA: {
          ApiOperation: {
            title: 'Update User Metadata',
            summary: 'Update a user metadata',
          },
          ApiOkResponse: {
            description: 'Successful Update User Metadata response',
          },
          ApiBadRequestResponse: {
            description: 'Bad Request',
          },
          ApiUnauthorized: {
            description: 'Unauthorized',
          },
          ApiNotFoundResponse: {
            description: 'User Not Found',
          },
          ApiInternalServerErrorResponse: {
            description: 'Internal server error',
          },
        },
      },
    },
    SCAN: {
      tag: 'Scan',
      endPoints: {
        CREATE_SCAN: {
          ApiOperation: {
            title: 'Create Scan',
            summary: 'Create a scan',
          },
          ApiOkResponse: {
            description: 'Successful Create Scan response',
          },
          ApiBadRequestResponse: {
            description: 'Bad Request',
          },
          ApiUnauthorized: {
            description: 'Unauthorized',
          },
          ApiInternalServerErrorResponse: {
            description: 'Internal server error',
          },
        },
        UPDATE_SCAN: {
          ApiOperation: {
            title: 'Update Scan',
            summary: 'Update a Scan',
          },
          ApiOkResponse: {
            description: 'Successful Update Scan response',
          },
          ApiBadRequestResponse: {
            description: 'Bad Request',
          },
          ApiUnauthorized: {
            description: 'Unauthorized',
          },
          ApiNotFoundResponse: {
            description: 'Scan Not Found',
          },
          ApiInternalServerErrorResponse: {
            description: 'Internal server error',
          },
        },
        GET_SCAN: {
          ApiOperation: {
            title: 'Get Scan',
            summary: 'Find scan by id',
          },
          ApiOkResponse: {
            description: 'Successful Get Scan response',
          },
          ApiBadRequestResponse: {
            description: 'Bad Request',
          },
          ApiUnauthorized: {
            description: 'Unauthorized',
          },
          ApiNotFoundResponse: {
            description: 'Scan Not Found',
          },
          ApiInternalServerErrorResponse: {
            description: 'Internal server error',
          },
        },
      },
    },
    APP_METADATA: {
      tag: 'App Metadata',
      endPoints: {
        GET_APP_METADATA: {
          ApiOperation: {
            title: 'Get App Metadata',
            summary: 'Get all of the app metadata',
          },
          ApiOkResponse: {
            description: 'Successful Get App Metadata response',
          },
          ApiBadRequestResponse: {
            description: 'Bad Request',
          },
          ApiUnauthorized: {
            description: 'Unauthorized',
          },
          ApiInternalServerErrorResponse: {
            description: 'Internal server error',
          },
        },
      },
    },
    THREAT: {
      tag: 'Threat',
      endPoints: {
        GET_THREAT_LIST: {
          ApiOperation: {
            title: 'Get Threat List',
            summary: 'Get all of the threats',
          },
          ApiOkResponse: {
            description: 'Successful Get Threat List response',
          },
          ApiBadRequestResponse: {
            description: 'Bad Request',
          },
          ApiUnauthorized: {
            description: 'Unauthorized',
          },
          ApiInternalServerErrorResponse: {
            description: 'Internal server error',
          },
        },
      },
    },
  },
};
