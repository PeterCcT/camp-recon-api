import { OAS3Definition } from 'swagger-jsdoc'

export const config: OAS3Definition = {
    'openapi': '3.0.3',
    'info': {
        'title': 'Recon api',
        'description': 'Api to Recon app from Ioasys Camp',
        'version': '1.0'
    },
    'components': {
        'schemas': {
            'DefaultError': {
                'type': 'object',
                'properties': {
                    'type': {
                        'type': 'string',
                    },
                    'message': {
                        'type': 'string'
                    },
                    'param': {
                        'type': 'string'
                    }
                }
            },
            'PartialUserData': {
                'type': 'object',
                'properties': {
                    'id': {
                        'type': 'string'
                    },
                    'name': {
                        'type': 'string'
                    },
                    'email': {
                        'type': 'string'
                    },
                    'avatar': {
                        'type': 'string',
                        'description': 'User url to avatar'
                    },
                    'categorie': {
                        'type': 'string'
                    },
                    'city': {
                        'type': 'string'
                    },
                    'state': {
                        'type': 'string'
                    },
                    'occupation': {
                        'type': 'string'
                    }
                }
            },
            'UserLinkData': {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string'
                    },
                    'url': {
                        'type': 'string'
                    }
                }
            },
            'UserAchievimentsData': {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string'
                    },
                    'description': {
                        'type': 'string'
                    },
                    'date': {
                        'type': 'string'
                    },
                    'imageUrl': {
                        'type': 'string'
                    }
                }
            },
            'UserGalleryData': {
                'type': 'array',
                'items': {
                    'type': 'string'
                }
            },
            'FullUserData': {
                'type': 'object',
                'properties': {
                    'description': {
                        'type': 'string'
                    },
                    'age': {
                        'type': 'integer'
                    },
                    'phone':{
                        'type': 'string'
                    },
                    'links': {
                        'type': 'array',
                        'items': {
                            'allOf': [{ '$ref': '#/components/schemas/UserLinkData' }]
                        }
                    },
                    'achievements': {
                        'type': 'array',
                        'items': {
                            'allOf': [{ '$ref': '#/components/schemas/UserAchievimentsData' }]
                        }
                    },
                    'galleryImages': {
                        'allOf': [{ '$ref': '#/components/schemas/UserGalleryData' }]
                    }
                },
                'allOf': [
                    {
                        '$ref': '#/components/schemas/PartialUserData'
                    }
                ],
            }
        },
    },
    'paths': {
        '/ufs': {
            'get': {
                'description': 'Return all Brazil UFS',
                'responses': {
                    '200': {
                        'description': 'List with all UFS',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'array',
                                    'items': {
                                        'type': 'object',
                                        'properties': {
                                            'name': {
                                                'type': 'string',
                                                'description': 'Full name of the uf'
                                            },
                                            'uf': {
                                                'type': 'string',
                                                'description': 'Short name of the uf'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/ufs/{uf}': {
            'get': {
                'description': 'List all cities from a specific Brazil uf',
                'parameters': [{
                    'name': 'uf',
                    'in': 'path',
                    'example': 'MG',
                    'schema': { 'type': 'string' },
                    'allowEmptyValue': false,
                    'required': true
                }],
                'responses': {
                    '200': {
                        'description': 'List with all cities',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'array',
                                    'items': {
                                        'type': 'string'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/categorie': {
            'get': {
                'description': 'List all Types of Categories',
                'responses': {
                    '200': {
                        'description': 'List with all categories',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'array',
                                    'items': {
                                        'type': 'string'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/user': {
            'get': {
                'description': 'List all users from Database',
                'parameters': [{
                    'name': 'limit',
                    'in': 'query',
                    'description': 'The limit of users to be returned',
                    'schema': { 'type': 'integer' },
                    'required': false,
                }, {
                    'name': 'page',
                    'in': 'query',
                    'description': 'The page to return based on limit query param',
                    'schema': { 'type': 'integer' },
                    'required': false
                }, {
                    'name': 'name',
                    'in': 'query',
                    'description': 'Name of users to be filtered',
                    'schema': { 'type': 'string' },
                    'required': false
                }, {
                    'name': 'age',
                    'in': 'query',
                    'description': 'Age of users to be filtered',
                    'schema': { 'type': 'integer' },
                    'required': false,
                }, {
                    'name': 'state',
                    'in': 'query',
                    'description': 'State of users to be filtered',
                    'schema': { 'type': 'string' },
                    'required': false
                }, {
                    'name': 'city',
                    'in': 'query',
                    'description': 'City of users to be filtered',
                    'schema': { 'type': 'string' },
                    'required': false
                }, {
                    'name': 'occupation',
                    'in': 'query',
                    'description': 'Occupation of users to be filtered',
                    'schema': { 'type': 'string' },
                    'required': false
                }, {
                    'name': 'categorie',
                    'in': 'query',
                    'description': 'Categorie of users to be filtered',
                    'schema': { 'type': 'string' },
                    'required': false
                }],
                'responses': {
                    '200': {
                        'description': 'List with all users founded or empty list',
                        'content': {
                            'application/json': {
                                'schema': {
                                    'type': 'array',
                                    'items': {
                                        'oneOf': [
                                            {
                                                '$ref': '#/components/schemas/PartialUserData'
                                            },
                                            {
                                                'type': 'array',
                                                'example': []
                                            }
                                        ],
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        'description': 'Wrong or missing value',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/DefaultError'
                                }
                            }
                        }
                    },
                    '500': {
                        'description': 'Internal error',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/DefaultError'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/user/favorites': {
            'get': {
                'description': 'Return all favorite users',
                'responses': {
                    '200': {
                        'description': 'List with all users founded or empty list',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/PartialUserData'
                                }
                            }
                        }
                    },
                    '500': {
                        'description': 'Internal error',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/DefaultError'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/user/{id}': {
            'get': {
                'parameters': [{
                    'name': 'id',
                    'in': 'path',
                    'schema': { 'type': 'string' },
                    'required': true,
                    'allowEmptyValue': false
                }, {
                    'name': 'Authorization',
                    'in': 'header',
                    'schema': { 'type': 'string' },
                    'required': true,
                    'allowEmptyValue': false,
                    'example': 'Bearer 123456'
                }],
                'description': 'Get user full info by id',
                'responses': {
                    '200': {
                        'description': 'Return full data of an user',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/FullUserData'
                                }
                            }
                        }
                    },
                    '400': {
                        'description': 'Wrong or missing value',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/DefaultError'
                                }
                            }
                        }
                    },
                    '500': {
                        'description': 'Internal error',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/DefaultError'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/login': {
            'post': {
                'description': 'Login',
                'parameters': [{
                    'name': 'email',
                    'in': 'body',
                    'schema': { 'type': 'string' },
                    'allowEmptyValue': false,
                    'required': true
                }, {
                    'name': 'password',
                    'in': 'body',
                    'schema': { 'type': 'string' },
                    'allowEmptyValue': false,
                    'required': true
                }],
                'responses': {
                    '200': {
                        'description': 'Partial user data return',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/PartialUserData'
                                }
                            }
                        }
                    },
                    '400': {
                        'description': 'Wrong or missing value',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/DefaultError'
                                }
                            }
                        }
                    },
                    '500': {
                        'description': 'Internal error',
                        'content': {
                            'application/json': {
                                'schema': {
                                    '$ref': '#/components/schemas/DefaultError'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
}