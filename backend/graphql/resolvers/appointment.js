const User = require('../../models/user.js');
const {loggedin, admin} = require('../../utils/verifyUser');
const generateToken = require('../../utils/generateToken.js');
const Appointment = require("../../models/appointment.js");

const createAppointment = async (args, {req}) => {
    try {
        // if(loggedin(req)) {
            const patient = await User.findById(req.user_id);
            const appointment = await Appointment.create({
                patientId: req.user_id,
                doctorId: args.appointmentInput.doctorId,
                date: args.appointmentInput.date,
                status: 'Pending',
            });
            if(appointment) {
                return {
                    ...appointment._doc
                };
            } else {
                throw new Error('Some error occures! Please try again later');
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
            const user = await User.findById(req.user_id);
            if(user.role=="patient") {
                const appointment = await Appointment.find({patientId: user_id});
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
                            element.status = 'Visited';
                        } else if (element.status == 'Canceled') {
                            element.status == 'Canceled';
                        } else if (a==d.getFullYear()&&b==(d.getMonth()+1)&&c==d.getDate()&&(+x + +100)>time) {
                            element.status = 'Pending';
                        } else {
                            element.status = 'Not Visited';
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
                            element.status = 'Visited';
                        } else if (element.status == 'Canceled') {
                            element.status == 'Canceled';
                        } else if (a==d.getFullYear()&&b==(d.getMonth()+1)&&c==d.getDate()&&(+x + +100)>time) {
                            element.status = 'Pending';
                        } else {
                            element.status = 'Not Visited';
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

const cancelAppointment = async (args, {req}) => {
    try {
        // if(loggedin(req)) {
            const appointment = await Appointment.findById(args.appointment_id);
            if(appointment) {
                appointment.status = 'Canceled';
                const updatedAppointment = await appointment.save();
                if(updatedAppointment) {
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
    changeStatus
}