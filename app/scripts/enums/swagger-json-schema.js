PhonicsApp.config( ['$provide', function ($provide) {
  $provide.constant('defaultSchema',

// Scheme JSON:
{
  "title": "A JSON Schema for Swagger 2.0 API.",
  "$schema": "http://json-schema.org/draft-04/schema#",

  "type": "object",
  "required": [ "swagger", "info", "paths" ],
  "additionalProperties": false,
  "patternProperties": {
    "^x-": {
      "$ref": "#/definitions/vendorExtension"
    }
  },
  "properties": {
    "swagger": {
      "type": "number",
      "enum": [ 2.0 ],
      "description": "The Swagger version of this document."
    },
    "info": {
      "$ref": "#/definitions/info"
    },
    "externalDocs": {
      "$ref": "#/definitions/externalDocs"
    },
    "host": {
      "type": "string",
      "format": "uri",
      "pattern": "^((?!\\:\/\/).)*$",
      "description": "The fully qualified URI to the host of the API."
    },
    "basePath": {
      "type": "string",
      "pattern": "^/",
      "description": "The base path to the API. Example: '/api'."
    },
    "schemes": {
      "type": "array",
      "description": "The transfer protocol of the API.",
      "items": {
        "type": "string",
        "enum": [ "http", "https", "ws", "wss" ]
      }
    },
    "consumes": {
      "type": "array",
      "description": "A list of MIME types accepted by the API.",
      "items": {
        "$ref": "#/definitions/mimeType"
      }
    },
    "produces": {
      "type": "array",
      "description": "A list of MIME types the API can produce.",
      "items": {
        "$ref": "#/definitions/mimeType"
      }
    },
    "paths": {
      "type": "object",
      "description": "Relative paths to the individual endpoints. They must be relative to the 'basePath'.",
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        },
        "^/.*[^\/]$": {
          "$ref": "#/definitions/pathItem"
        }
      },
      "additionalProperties": false
    },
    "definitions": {
      "type": "object",
      "description": "One or more JSON objects describing the schemas being consumed and produced by the API.",
      "additionalProperties": { "$ref": "#/definitions/schema" }
    },
    "parameters": {
      "type": "object",
      "description": "One or more JSON representations for parameters",
      "additionalProperties": { "$ref": "#/definitions/parameter" }
    },
    "responses": { "$ref": "#/definitions/responses" },
    "security": { "$ref": "#/definitions/security" },
    "tags": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/tag"
      }
    }
  },
  "definitions": {
    "externalDocs": {
      "type": "object",
      "description": "information about external documentation",
      "required": [ "url" ],
      "properties": {
        "description": {
          "type": "string"
        },
        "url": {
          "type": "string",
          "format": "uri"
        }
      }
    },
    "info": {
      "type": "object",
      "description": "General information about the API.",
      "required": [ "version", "title" ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "version": {
          "type": "string",
          "description": "A semantic version number of the API."
        },
        "title": {
          "type": "string",
          "description": "A unique and precise title of the API."
        },
        "description": {
          "type": "string",
          "description": "A longer description of the API. Should be different from the title.  Github-flavored markdown is allowed."
        },
        "termsOfService": {
          "type": "string",
          "description": "The terms of service for the API."
        },
        "contact": {
          "type": "object",
          "description": "Contact information for the owners of the API.",
          "additionalProperties": false,
          "properties": {
            "name": {
              "type": "string",
              "description": "The identifying name of the contact person/organization."
            },
            "url": {
              "type": "string",
              "description": "The URL pointing to the contact information.",
              "format": "uri"
            },
            "email": {
              "type": "string",
              "description": "The email address of the contact person/organization.",
              "format": "email"
            }
          }
        },
        "license": {
          "type": "object",
          "required": [ "name" ],
          "additionalProperties": false,
          "properties": {
            "name": {
              "type": "string",
              "description": "The name of the license type. It's encouraged to use an OSI compatible license."
            },
            "url": {
              "type": "string",
              "description": "The URL pointing to the license.",
              "format": "uri"
            }
          }
        }
      }
    },
    "example": {
      "type": "object",
      "patternProperties": {
        "^[a-z0-9-]+/[a-z0-9-+]+$": {}
      },
      "additionalProperties": false
    },
    "mimeType": {
      "type": "string",
      "pattern": "^[\\sa-z0-9-+;\\.=\\/]+$",
      "description": "The MIME type of the HTTP message."
    },
    "operation": {
      "type": "object",
      "required": [ "responses" ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "summary": {
          "type": "string",
          "description": "A brief summary of the operation."
        },
        "description": {
          "type": "string",
          "description": "A longer description of the operation, github-flavored markdown is allowed."
        },
        "externalDocs": {
          "$ref": "#/definitions/externalDocs"
        },
        "operationId": {
          "type": "string",
          "description": "A friendly name of the operation"
        },
        "produces": {
          "type": "array",
          "description": "A list of MIME types the API can produce.",
          "additionalItems": false,
          "items": {
            "$ref": "#/definitions/mimeType"
          }
        },
        "consumes": {
          "type": "array",
          "description": "A list of MIME types the API can consume.",
          "additionalItems": false,
          "items": {
            "$ref": "#/definitions/mimeType"
          }
        },
        "parameters": {
          "type": "array",
          "description": "The parameters needed to send a valid API call.",
          "minItems": 1,
          "additionalItems": false,
          "items": {
            "oneOf": [
              { "$ref": "#/definitions/parameter" },
              {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "$ref": {
                    "type": "string"
                  }
                }
              }
            ]
          }
        },
        "responses": {
          "$ref": "#/definitions/responses"
        },
        "schemes": {
          "type": "array",
          "description": "The transfer protocol of the API.",
          "items": {
            "type": "string",
            "enum": [ "http", "https", "ws", "wss" ]
          }
        },
        "security": {
          "$ref": "#/definitions/securityRequirement"
        }
      }
    },
    "pathItem": {
      "type": "object",
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "$ref": {
          "type": "string"
        },
        "get": {
          "$ref": "#/definitions/operation"
        },
        "put": {
          "$ref": "#/definitions/operation"
        },
        "post": {
          "$ref": "#/definitions/operation"
        },
        "delete": {
          "$ref": "#/definitions/operation"
        },
        "options": {
          "$ref": "#/definitions/operation"
        },
        "head": {
          "$ref": "#/definitions/operation"
        },
        "patch": {
          "$ref": "#/definitions/operation"
        },
        "parameters": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/parameter"
          }
        }
      }
    },
    "responses": {
      "type": "object",
      "description": "Response objects names can either be any valid HTTP status code or 'default'.",
      "minProperties": 1,
      "additionalProperties": false,
      "patternProperties": {
        "^([0-9]+)$|^(default)$": {
          "$ref": "#/definitions/response"
        },
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      }
    },
    "response": {
      "type": "object",
      "required": [ "description" ],
      "properties": {
        "description": {
          "type": "string"
        },
        "schema": {
          "$ref": "#/definitions/schema"
        },
        "headers": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/serializableType"
          }
        },
        "examples": {
          "$ref": "#/definitions/example"
        }
      },
      "additionalProperties": false
    },
    "serializableType": {
      "properties": {
        "type": {
          "type": "string",
          "enum": [ "string", "number", "boolean", "integer", "array", "file" ]
        },
        "format": {
          "type": "string"
        },
        "items": {
          "type": "object"
        },
        "collectionFormat": {
          "type": "string"
        }
      }
    },
    "vendorExtension": {
      "description": "Any property starting with x- is valid.",
      "additionalProperties": true,
      "additionalItems": true
    },
    "parameter": {
      "type": "object",
      "required": [ "name", "in" ],
      "oneOf": [
        {
          "patternProperties": {
            "^x-": {
              "$ref": "#/definitions/vendorExtension"
            }
          },
          "properties": {
            "name": {
              "type": "string",
              "description": "The name of the parameter."
            },
            "in": {
              "type": "string",
              "description": "Determines the location of the parameter.",
              "enum": [ "query", "header", "path", "formData" ]
            },
            "description": {
              "type": "string",
              "description": "A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed."
            },
            "required": {
              "type": "boolean",
              "description": "Determines whether or not this parameter is required or optional."
            },
            "type": {
              "type": "string",
              "enum": [ "string", "number", "boolean", "integer", "array" ]
            },
            "format": {
              "type": "string"
            },
            "items": {
              "type": "object"
            },
            "collectionFormat": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        {
          "patternProperties": {
            "^x-": {
              "$ref": "#/definitions/vendorExtension"
            }
          },
          "properties": {
            "name": {
              "type": "string",
              "description": "The name of the parameter."
            },
            "in": {
              "type": "string",
              "description": "Determines the location of the parameter.",
              "enum": [ "body" ]
            },
            "description": {
              "type": "string",
              "description": "A brief description of the parameter. This could contain examples of use."
            },
            "required": {
              "type": "boolean",
              "description": "Determines whether or not this parameter is required or optional."
            },
            "schema": {
              "$ref": "#/definitions/schema"
            }
          },
          "additionalProperties": false
        }
      ]
    },
    "schema": {
      "type": "object",
      "description": "A deterministic version of a JSON Schema object.",
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        }
      },
      "properties": {
        "$ref": { "type": "string" },
        "format": { "type": "string" },
        "title": { "$ref": "http://json-schema.org/draft-04/schema#/properties/title" },
        "description": { "$ref": "http://json-schema.org/draft-04/schema#/properties/description" },
        "default": { "$ref": "http://json-schema.org/draft-04/schema#/properties/default" },
        "multipleOf": { "$ref": "http://json-schema.org/draft-04/schema#/properties/multipleOf" },
        "maximum": { "$ref": "http://json-schema.org/draft-04/schema#/properties/maximum" },
        "exclusiveMaximum": { "$ref": "http://json-schema.org/draft-04/schema#/properties/exclusiveMaximum" },
        "minimum": { "$ref": "http://json-schema.org/draft-04/schema#/properties/minimum" },
        "exclusiveMinimum": { "$ref": "http://json-schema.org/draft-04/schema#/properties/exclusiveMinimum" },
        "maxLength": { "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveInteger" },
        "minLength": { "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0" },
        "pattern": { "$ref": "http://json-schema.org/draft-04/schema#/properties/pattern" },
        "discriminator": { "type": "string" },
        "xml": { "$ref": "#/definitions/xml"},
        "items": {
          "anyOf": [
            { "$ref": "#/definitions/schema" },
            {
              "type": "array",
              "minItems": 1,
              "items": { "$ref": "#/definitions/schema" }
            }
          ],
          "default": { }
        },
        "maxItems": { "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveInteger" },
        "minItems": { "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0" },
        "uniqueItems": { "$ref": "http://json-schema.org/draft-04/schema#/properties/uniqueItems" },
        "maxProperties": { "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveInteger" },
        "minProperties": { "$ref": "http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0" },
        "required": { "$ref": "http://json-schema.org/draft-04/schema#/definitions/stringArray" },
        "externalDocs": { "$ref": "#/definitions/externalDocs" },
        "properties": {
          "type": "object",
          "additionalProperties": { "$ref": "#/definitions/schema" },
          "default": { }
        },
        "enum": { "$ref": "http://json-schema.org/draft-04/schema#/properties/enum" },
        "type": { "$ref": "http://json-schema.org/draft-04/schema#/properties/type" },
        "example": {

        },
        "allOf": {
          "type": "array",
          "minItems": 1,
          "items": { "$ref": "#/definitions/schema" }
        }
      }
    },
    "security": {
      "description": "defines security definitions"
    },
    "securityRequirement": {
      "description": "defines a security requirement",
      "type": "array"
    },
    "xml": {
      "properties": {
        "name": { "type": "string"},
        "namespace": { "type": "string" },
        "prefix": { "type": "string" },
        "attribute": { "type": "boolean" },
        "wrapped": { "type": "boolean" }
      },
      "additionalProperties": false
    },
    "tag": {
      "type": "object",
      "properties": {
        "externalDocs": { "$ref": "#/definitions/externalDocs" }
      },
      "patternProperties": {
        "^x-": {
          "$ref": "#/definitions/vendorExtension"
        },
        "^/.*[^\/]$": {
          "type": "string"
        }
      }
    }
  }
}
// End of Schema JSON
);
}]);
