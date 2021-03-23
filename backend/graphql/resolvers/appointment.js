const User = require('../../models/user.js');
const {loggedin, admin} = require('../../utils/verifyUser');
const generateToken = require('../../utils/generateToken.js');
const Appointment = require("../../models/appointment.js");
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
});

const createAppointment = async (args, {req}) => {
    try {
        // if(loggedin(req)) {
            const patient = await User.findById(args.appointmentInput.patientId);
            const appointment = await Appointment.create({
                patientId: args.appointmentInput.patientId,
                doctorId: args.appointmentInput.doctorId,
                description: args.appointmentInput.description,
                date: args.appointmentInput.date,
                status: 'Pending',
            });
            if(appointment) {
                const from = 'CodeX Clinic';
                const to = process.env.PHONENO;
                const text = 'Your appointment has been booked';
                nexmo.message.sendSms(from, to, text, 
                    function(error, result) {    
                    if(error) { 
                        console.log("ERROR", error) 
                    } 
                    else { 
                        console.log("RESULT", result) 
                        console.log(text);
                    } 
                }); 
                return {
                    ...appointment._doc
                };
            } else {
                throw new Error('Some error occured! Please try again later');
            }
        // }
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const viewAppointment = async (args, {req}) => {
    try {
        // if(loggedin(req)) {
            let d = new Date();
            let x = [];
            // console.log(args);
            const user = await User.findById(args.user_id);
            // console.log(user);
            if(user.role=="patient") {
                const appointment = await Appointment.find({patientId: user._id}).populate('doctorId');
                // console.log(appointment);
                if (appointment) {
                    appointment.forEach(element => {
                        let status = "";
                        let date = element.date;
                        let a = date.substring(0,4);
                        let b = date.substring(5,7);
                        let c = date.substring(8,10);
                        let y = date.substring(11,13);
                        let z = date.substring(14,16);
                        let x = y+z;
                        let time = d.getHours().toString() + d.getMinutes().toString();
                        if (element.status == 'Visited') {
                            console.log(1);
                            element = Appointment.findByIdAndUpdate(element._id, {$set : {status: 'Visited'}} );
                        } else if (element.status == 'Canceled') {
                            console.log(2);
                            element = Appointment.findByIdAndUpdate(element._id, {$set : {status: 'Canceled'}} ); 
                        } else if (a==d.getFullYear()&&b==(d.getMonth()+1)&&c==d.getDate()&&(+x + +100)>time) {
                            console.log(3);
                            element = Appointment.findByIdAndUpdate(element._id, {$set : {status: 'Pending'}} ); 
                        } else {
                            console.log(4);
                            element = Appointment.findByIdAndUpdate(element._id, {$set : {status:'Not Visited'}} ); 
                        }     
                    });
                    return appointment;
                } else {
                    throw new Error('No appointments found!!');
                }
            } else {
                const appointment = await Appointment.find({doctorId: user_id});
                if (appointment) {
                    appointment.forEach(element => {
                        let date = element.date;
                        let a = date.substring(0,4);
                        let b = date.substring(5,7);
                        let c = date.substring(8,10);
                        let y = date.substring(11,13);
                        let z = date.substring(14,16);
                        let x = y+z;
                        let time = d.getHours().toString() + d.getMinutes().toString();
                        if (element.status == 'Visited') {
                            console.log(1);
                            element = Appointment.findByIdAndUpdate(element._id, {$set : {status: 'Visited'}} );
                        } else if (element.status == 'Canceled') {
                            console.log(2);
                            element = Appointment.findByIdAndUpdate(element._id, {$set : {status: 'Canceled'}} ); 
                        } else if (a==d.getFullYear()&&b==(d.getMonth()+1)&&c==d.getDate()&&(+x + +100)>time) {
                            console.log(3);
                            element = Appointment.findByIdAndUpdate(element._id, {$set : {status: 'Pending'}} ); 
                        } else {
                            console.log(4);
                            element = Appointment.findByIdAndUpdate(element._id, {$set : {status:'Not Visited'}} ); 
                        }   
                    });
                    return appointment;
                } else {
                    throw new Error('No appointments found!!');
                }
            }
        // }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getAllAppointments = async (args, {req}) => {
    try {
        const user = await User.findById(args.user_id);
        console.log(user);
        if(user.role=='patient') {
            const appointment = Appointment.find({patientId: args.user_id}).populate('doctorId');;
            if(appointment) {
                return appointment;
            }
        } else {
            const appointment = Appointment.find({doctorId: args.user_id});
            if(appointment) {
                return appointment;
            }
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const cancelAppointment = async (args, {req}) => {
    try {
        // if(loggedin(req)) {
            const appointment = await Appointment.findById(args.appointment_id);
            if(appointment) {
                appointment.status = 'Canceled';
                const updatedAppointment = await appointment.save();
                if(updatedAppointment) {
                    const from = 'CodeX Clinic';
                    const to = process.env.PHONENO;
                    const text = 'Your appointment has been canceled';
                    nexmo.message.sendSms(from, to, text, 
                        function(error, result) {    
                        if(error) { 
                            console.log("ERROR", error) 
                        } 
                        else { 
                            console.log("RESULT", result) 
                            console.log(text);
                        } 
                    }); 
                    return {msg: 'Appointment canceled!!'};
                } else {
                    return {msg: 'Some error occures! Please try again later'};
                }  
            } else {
                throw new Error('No appointments found!!');
            }
        // }    
    } catch (err) {
        console.log(err);
        throw err;
      }
}

const changeStatus = async (args, {req}) => {
    try {
        // if(loggedin(req)) {
            const appointment = await Appointment.findById(args.appointment_id);
            if(appointment) {
                appointment.status = 'Visited';
                const updatedAppointment = await appointment.save();
                if(updatedAppointment) {
                    const from = 'CodeX Clinic';
                    const to = process.env.PHONENO;
                    const text = 'You have visited your appointment';
                    nexmo.message.sendSms(from, to, text, 
                        function(error, result) {    
                        if(error) { 
                            console.log("ERROR", error) 
                        } 
                        else { 
                            console.log("RESULT", result) 
                            console.log(text);
                        } 
                    }); 
                    return {msg: 'Appointment visited!!'};
                } else {
                    return {msg: 'Some error occures! Please try again later'};
                }    
            } else {
                throw new Error('No appointments found!!');
            }
        // }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    createAppointment,
    viewAppointment,
    cancelAppointment,
    changeStatus,
    getAllAppointments
}