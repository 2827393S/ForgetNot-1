import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import Button from "@mui/material/Button";
import * as React from "react";
import {Delete} from "@mui/icons-material";
import {get,post} from "../utils/requests"



function CustomAppointmentForm(props) {
    const [loading, setLoading] = useState(true);
    const [roomData, setRoomData] = useState([]);

    useEffect(() => {

    }, []);

    const handleRoomDelete = (roomName) => {
        setRoomData((prevData) => prevData.filter((room) => room.name !== roomName));
    };

    const [appointmentData, setAppointmentData] = useState(props.appointmentData);

    const onFieldChange = (nextAppointmentData) => {
        setAppointmentData((prevAppointmentData) => ({
            ...prevAppointmentData,
            ...nextAppointmentData,
        }));
    };

    const onCustomFieldChange = (nextValue) => {
        onFieldChange({ customField: nextValue });
    };

    if(loading){
        return <CircularProgress style={{padding: '8px' }}></CircularProgress>
    }else


    return (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
            <tr style={{ borderBottom: '1px solid #E5E5E5' }}>
                <th style={{ textAlign: 'left', padding: '8px', fontWeight: 'normal' }}>Name/Email</th>
                <th style={{ textAlign: 'center', padding: '8px', fontWeight: 'normal' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '8px', fontWeight: 'normal' }}>Operation</th>
            </tr>
            </thead>
            <tbody>
            <tr style={{ borderBottom: '1px solid #E5E5E5' }}>
                <td style={{ padding: '8px' }}>Room A</td>
                <td style={{ textAlign: 'center',padding: '8px' }}>Room A</td>
                <td style={{ textAlign: 'right', padding: '8px' }}>
                    <button>
                        <Delete />
                    </button>
                </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E5E5E5' }}>
                <td style={{ padding: '8px' }}>Room B</td>
                <td style={{ textAlign: 'center', padding: '8px' }}>
                    <input type="checkbox" />
                </td>
            </tr>
            <tr>
                <td style={{ padding: '8px' }}>Room C</td>
                <td style={{ textAlign: 'center', padding: '8px' }}>
                    <input type="checkbox"  />
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default CustomAppointmentForm;