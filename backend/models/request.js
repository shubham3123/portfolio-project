const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema(
    {
        name:           {type: String, required: !!1 },
        email:          {type: String, required: !!1 },
        description:    { type: String, required: !!1 },
        requestType:    { type: String, enum:['prject', 'callback'], default: 'project' },
        callbackTime:   { type: String, default: null},  // Stores preffered time if callback is chosen
        createdAt:      { type: Date, default: Datenow  }
    });

    module.export = mongoose.model( 'Request' ,RequestSchema)