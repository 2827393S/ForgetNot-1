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

//import { appointments } from './demo-data/month-appointments';
//import { owners } from './demo-data/tasks';
//import { appointments } from './demo-data/resources';
import {get,post} from '../utils/requests'
import { eventLabels } from './Globals.js';
import { birthdays, meetings, tasks,travel } from './demo-data/events';
import axios from "axios";


const ExternalViewSwitcher = ({
  currentViewName,
  onChange,
}) => (
  <RadioGroup
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

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);


    const labelId = window.localStorage.getItem('labelId');
      //alert("labelId schedule: "+labelId);
      let dataVal;

      if(labelId==='1'){
			dataVal=birthdays;
		}else if(labelId==='2'){
			dataVal=meetings;
		}else if(labelId==='3'){
			dataVal=tasks;
		}else if(labelId==='4'){
			dataVal=travel;
		}else {
			dataVal=birthdays;
		}
	//example get data
      get("/user/event/get_list")
          .then(function (res){
              console.log(res)
          })


    this.state = {
      data: dataVal,
      currentViewName: window.localStorage.getItem( 'currentViewName'),
	  currentDate: '2023-02-19',
	  resources: [
        {
          fieldName: 'labelId',
          title: 'Label',
          instances: eventLabels,
        },
      ],
    };
	
	
	/*this.state = {
      data: appointments,
      currentViewName: 'Month',
	  currentDate: '2023-02-19',
	  resources: [
        {
          fieldName: 'roomId',
          title: 'Room',
          instances: eventLabels,
        },
        {
          fieldName: 'members',
          title: 'Members',
          instances: owners,
          allowMultiple: true,
        },
      ],
    };*/

    this.currentViewNameChange = (e) => {
      this.setState({ currentViewName: e.target.value });
	  window.localStorage.getItem( 'currentViewName', e.target.value);

    };
	this.commitChanges = this.commitChanges.bind(this);
	this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };

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
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
	
	

	
  }

  render() {
    const { data, currentViewName, currentDate, resources } = this.state;

    return (
      <React.Fragment>
        <ExternalViewSwitcher
          currentViewName={currentViewName}
          onChange={this.currentViewNameChange}
        />

        <Paper>
          <Scheduler
            data={data}
            height={570}
          >
            <ViewState
              defaultCurrentDate="2023-02-19"
              currentViewName={currentViewName}
			  currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
          />
			
			{/* <--- Appointment editing --->  */}
			
			 <EditingState
            onCommitChanges={this.commitChanges}
				/>
          <IntegratedEditing />

		  {/* <--- Daily view --->  */}
			 <DayView
            startDayHour={0}
            endDayHour={24}
          />
		  
		  {/* <--- Weekly view --->  */}
            <WeekView
              startDayHour={0}
              endDayHour={24}
            />
          		 
		{/* <--- Monthly view --->  */}
            <MonthView />

			{/* <--- Appointment form popup for creation and edit --->  */}
		 <ConfirmationDialog />
		 
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
		   <Toolbar />
          <DateNavigator />
          <TodayButton />
		  
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
