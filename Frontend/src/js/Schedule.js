import * as React from 'react';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    ConfirmationDialog,
    Toolbar,
    DateNavigator,
    TodayButton,
    Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import Button from '@mui/material/Button';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';



import {get,post} from '../utils/requests'
import axios from "axios";

import { eventLabels } from './Globals.js';
import { birthdays, meetings, study,travel } from './demo-data/events';


const TextEditor = (props) => {
   return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.TextEditor
	value={appointmentData.customField}
        placeholder="Host"
      />
	<AppointmentForm.TextEditor
        value={appointmentData.customField}
        placeholder="Invitees"
      />
    </AppointmentForm.BasicLayout>
  );
};

const ExternalViewSwitcher = ({currentViewName, onChange, }) => 
	
(<RadioGroup
    aria-label="Views"
    style={{ flexDirection: 'row' }}
    name="views"
    value={currentViewName}
    onChange={onChange}
  >
  
  	{/* <--- Radio buttons --->  */}

    <FormControlLabel value="Day" control={<Radio />} label="Day" />
    <FormControlLabel value="Week" control={<Radio />} label="Week" />
    <FormControlLabel value="Month" control={<Radio />} label="Month" />

	
  </RadioGroup>
);

// const Appointment = ({ onClick, onDoubleClick, ...restProps }) => {
  // return <Appointments.Appointment onDoubleClick={onDoubleClick} {...restProps} />;
// };

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
	
	
	var labelId=window.localStorage.getItem( 'labelId');
	//alert("labelId schedule: "+labelId);
	var dataVal;

		if(labelId=='1'){
			dataVal=birthdays;
		}else if(labelId=='2'){
			dataVal=meetings;
		}else if(labelId=='3'){
			dataVal=study;
		}else if(labelId=='4'){
			dataVal=travel;
		}else {
			dataVal=birthdays;
		}
	
     // let dataVal=[];


	/* State variable to keep track of appointment form visibility */
	 this.state = {
       addNewEvent: false

     };

    this.state = {
        data: dataVal,
        addNewEvent: false,
        currentViewName: window.localStorage.getItem( 'currentViewName'),
        resources: [
        /* <--- This displays the label field and drop down selection--->  */
            {
              fieldName: 'labelId',
              title: 'Label',
              instances: eventLabels,
            },
        ],
    };
	


    this.currentViewNameChange = (e) => {
      this.setState({ currentViewName: e.target.value });
	  window.localStorage.getItem( 'currentViewName', e.target.value);

    };
	this.commitChanges = this.commitChanges.bind(this);
	this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
	
	
  

  }

    componentDidUpdate(prevProps) {

      const {label_id} = this.props
        if (label_id !== prevProps.label_id) {
            let that = this
            this.getEventList(label_id)
                .then(function (res){
                    that.setState({data:res})
                })
        }
    }

    async getEventList(label_id){
        let dataVal = [];
        await get("/api/event/get_list",{"id":label_id})
            .then(function (res){
                let data = res.data
                data.forEach(value=>{
                    value['startDate'] = new Date(value['startTime'])
                    value['endDate'] = new Date(value['endTime'])
                    value['allDay'] = false
                    value['rRule'] = ''
                    delete value['startTime'];
                    delete value['endTime'];
                    dataVal.push(value)
                })
            })
        return dataVal
    }
  
 
  
  	/* <--- Appointment editing and saving --->  */

   commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;

      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
          console.log("this is the change:",changed);
          console.log("this is the data",data)
        data = data.map((appointment) => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)
        );
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
	  
	  console.log("*********** COMMITTED DATA ****************");
	  console.table(data);
	  	 
		this.setState({addNewEvent:false})

      return { data };
    });
  }
  
  

  render() {

    const { data, currentViewName, currentDate, resources } = this.state;

	/* Method to toggle appointment form visibility */
	const showAppointmentForm = (bool) => {

         this.setState({addNewEvent: bool})
    };
  
  	const appointmentForm = () => {
   
      	    //  this.setState({addNewEvent: bool})
      };

  

    return (

      <React.Fragment>
        <ExternalViewSwitcher
          currentViewName={currentViewName}
          onChange={this.currentViewNameChange}
        />
        <Paper>
            <Scheduler data={data} height={570}>
            <ViewState
              defaultCurrentDate={new Date()}
              currentViewName={currentViewName}
              onCurrentDateChange={this.currentDateChange}
            />
			{/* <--- Appointment editing --->  */}
            <EditingState onCommitChanges={this.commitChanges} />
            <IntegratedEditing />

            {/* <--- Daily view --->  */}
            <DayView startDayHour={0} endDayHour={24}/>
		  
            {/* <--- Weekly view --->  */}
            <WeekView startDayHour={0} endDayHour={24}/>
          		 
            {/* <--- Monthly view --->  */}
            <MonthView />
			
			 <Button 
				variant="contained" 
				sx={{maxWidth: '200px', maxHeight: '40px'}} 
				color="primary" 
				startIcon={<EventOutlinedIcon />}
				onClick={showAppointmentForm.bind(null,true)} >
			 Add new event
			 </Button>


            {/* <--- Appointment form popup for creation and edit --->  */}
            <Appointments/>

            <AppointmentTooltip showOpenButton showDeleteButton  
			/>
            <ConfirmationDialog />

            <Toolbar />
            <DateNavigator />
            <TodayButton />

            <AppointmentForm visible={this.state.addNewEvent} 
				onVisibilityChange={showAppointmentForm.bind(null)}

				basicLayoutComponent={BasicLayout} 
				textEditorComponent={TextEditor}/>
				
            <Resources
                data={resources}
                mainResourceName="labelId"
            />

            </Scheduler>
        </Paper>
      </React.Fragment>
    );
  }
}
