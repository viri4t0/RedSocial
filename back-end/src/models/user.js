const mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ["ADMIN", "USER"],
    message: '{VALUE} no es un role válido'
}

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "El nombre de usuario es necesario"],
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"],
    },
    password: {
        type: String,
        required: [true, "Le contraseña es obligatoria"],
    },
    visible: {
        type: Boolean,
        default: true,
        required: [true]
    },
    role: {
        type: String,
        default: 'USER',
        required: [true],
        enum: rolesValidos,
    },
    sector: {
        type: String,
        default: 'ninguno',
    },
    aficiones: {
      type: String,
      default: 'ninguno',
    },
    fechaNacimiento: {
      type: String,
      default: '00-00-0000',
    },
    cp: {
      type: Number,
      default: 111111,
    },
    trabajo: {
      type: String,
      default: "Sin trabajo"
    },
    perfil: {
      type: String,
      default: "privado"
    },
    perfilPublico: {
        empresa: {
            type: Boolean,
            default : false,
        },
        sector: {
            type: Boolean,
            default : false,
        },
        zona: {
            type: Boolean,
            default : false,
        },
        noZona: {
            type: Boolean,
            default : false,
        }
    },
    puedeVerPublico: {
      correo: {
          type: Boolean,
          default : false,
      },
      sector: {
          type: Boolean,
          default : false,
      },
      aficiones: {
          type: Boolean,
          default : false,
      },
      edad: {
          type: Boolean,
          default : false,
      },
      cp: {
          type: Boolean,
          default : false,
      },
      trabajo: {
          type: Boolean,
          default : false,
      }
    },
    puedeVerConocido: {
      correo: {
          type: Boolean,
          default : false,
      },
      sector: {
          type: Boolean,
          default : false,
      },
      aficiones: {
          type: Boolean,
          default : false,
      },
      edad: {
          type: Boolean,
          default : false,
      },
      cp: {
          type: Boolean,
          default : false,
      },
      trabajo: {
          type: Boolean,
          default : false,
      }
    },
    puedeVerAmigo: {
      correo: {
          type: Boolean,
          default : false,
      },
      sector: {
          type: Boolean,
          default : false,
      },
      aficiones: {
          type: Boolean,
          default : false,
      },
      edad: {
          type: Boolean,
          default : false,
      },
      cp: {
          type: Boolean,
          default : false,
      },
      trabajo: {
          type: Boolean,
          default : false,
      }
    },
    postPublic: {
      empresa: {
          type: Boolean,
          default : false,
      },
      sector: {
          type: Boolean,
          default : false,
      },
      zona: {
          type: Boolean,
          default : false,
      },
      noZona: {
          type: Boolean,
          default : false,
      }
    },
    postConocido: {
      empresa: {
          type: Boolean,
          default : false,
      },
      sector: {
          type: Boolean,
          default : false,
      },
      zona: {
          type: Boolean,
          default : false,
      },
      noZona: {
          type: Boolean,
          default : false,
      }
    },
    postAmigo: {
      empresa: {
          type: Boolean,
          default : false,
      },
      sector: {
          type: Boolean,
          default : false,
      },
      zona: {
          type: Boolean,
          default : false,
      },
      noZona: {
          type: Boolean,
          default : false,
      }
    },
    sentRequest:[{
      username: {type: String, default: ''}
    }],
    requestRecived: [{
      userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      username: {type: String, default: ''}
    }],
    friendList: [{
      friendId: {type: mongoose.Schema.Types.ObjectId, ref: 'Relaciones'},
    }],
});


// elimina la key password del objeto que retorna al momento de crear un usuario
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})


module.exports = mongoose.model('Usuario', userSchema)

