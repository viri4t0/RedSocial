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
    sentRequest:[{
		username: {type: String, default: ''}
	}],
	requestRecived: [{
		userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		username: {type: String, default: ''}
	}],
	friendList: [{
		friendId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		friendName: {type: String, default: ''}
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