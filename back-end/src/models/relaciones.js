const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let relacionesSchema = new Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'El nombre es necesario'],
  },

  user2 : {
    type : mongoose.Schema.Types.ObjectId,
    required: [true, 'El nombre es necesario'],
  },
  status : {
    type : Number,
    required: [true, 'Status necesario'],
  },
  statusUser1 : {
    type : Number,
    required: [true, 'Stat user 1 necesario'],
  },
  statusUser2 : {
    type : Number,
    required: [true, 'Stat user 2 necesario'],
  },
  action_user : {
    type : mongoose.Schema.Types.ObjectId,
    required: [true, 'Action user necesario'],
  },
 nombreUser1 : {
  type : String,
  required: [true, 'Action user necesario'],
},

nombreUser2 : {
  type : String,
  required: [true, 'Action user necesario'],
},

});

module.exports = mongoose.model('Relaciones', relacionesSchema)
