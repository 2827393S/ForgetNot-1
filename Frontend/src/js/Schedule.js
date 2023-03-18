import * as React from 'react';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {EditingState, IntegratedEditing, ViewState} from '@devexpress/dx-react-scheduler';
import {
    AppointmentForm,
    Appointments,
    AppointmentTooltip,
    ConfirmationDialog,
    DateNavigator,
    DayView,
    MonthView,
    Resources,
    Scheduler,
    TodayButton,
    Toolbar,
    WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';


import {get,post} from '../utils/requests'
import axios from "axios";

import { eventLabels } from './Globals.js';
import { birthdays, meetings, study,travel } from './demo-data/events';
import Button from "@mui/material/Button";
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';


var isGuest=window.localStorage.getItem( 'isGuest'); // To enable or disbale guest mode
var guestEventID=window.localStorage.getItem( 'guestEventID'); // The guest eventID


const CustomButton = ({ onExecute }) => (
  <Button variant="contained" color="primary" onClick={onExecute}>
    Invite +
  </Button>
);

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
<AppointmentForm.CommandButton command="Invite +" />
      <CustomButton command="customAction" onExecute={() => alert('Invite Button Clicked!')} />
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
    let that = this;


	/* State variable to keep track of appointment form visibility */

    this.state = {
        data: [],
        realData : [],
        addNewEvent: false,
        mainResourceName: 'Label',
        currentViewName: 'Month' ,
        resources: [
        /* <--- This displays the label field and drop down selection--->  */
            {
                fieldName: "label_id",
                title: "Label",
                instances: [],
            }
        ],
    };


	
    this.currentViewNameChange = (e) => {
      this.setState({ currentViewName: e.target.value });

    };
	this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    this.commitChanges = this.commitChanges.bind(this);

	/* Method to toggle appointment form visibility */

    this.showAppointmentForm = (bool) => {
	
	if(isGuest!=1)
         this.setState({addNewEvent: bool})
	 else
		 this.setState({addNewEvent: true})
    };


	if(isGuest==1)
	{
	this.state = {addNewEvent: true};

	}
  

  }
  

    componentDidUpdate(prevProps,prevStates) {

      const {label_id,label_data} = this.props
        const {data} = this.state

        if(data !== prevStates.data){
            let newData = []
            data.forEach(value=>{
                if(value['label_id']===label_id){
                    newData.push(value)
                }
            })
            this.setState({realData: newData})
        }


        if (label_id !== prevProps.label_id) {
            let that = this
            this.getEventList(label_id)
                .then(function (res){
                    console.log(res)
                    that.setState({data:res})
                })
        }

        // format and add label_data for user choosing
        if(label_data !== prevProps.label_data){
            let {resources} = this.state
            let label = resources[0];
            label.instances = [];
            label_data.forEach(value=>{
                value['text'] = value['name']
                value['color'] = "#90ee90"
                delete value['name']
                delete value['owner']
                label.instances.push(value)
            })
            this.setState({resources:[label]})
        }

    }

    async getEventList(label_id) {
        let dataVal = [];
        await get("/api/event/get_list", {"id": label_id})
            .then(function (res) {
                let data = res.data
                data.forEach(value => {
                    value['startDate'] = new Date((value['startTime']))
                    value['endDate'] = new Date(value['endTime'])
                    value['label_id'] = value['labelId']
                    delete value['startTime'];
                    delete value['endTime'];
                    delete value['labelId']
                    dataVal.push(value)
                })
            })
        return dataVal
    }

    eventLegal(event){
      if(event['title'] === ""|| event['title'] === undefined || event['label_id'] === "" || event['']){
          alert("have importance thing has no finish")
          return false
      }else{
          return true
      }
    }
  	/* <--- Appointment editing and saving --->  */
   

    commitChanges({ added, changed, deleted }) {
		if(isGuest!=1)
		{
			let {data} = this.state;
			let {label_id} = this.props;
			let oldData = data;
			console.log("added",added)
			console.log("changed",changed)
			console.log("deleted",deleted)
			if(added){
				let that = this
				data = [...data, { ...added }];
				let pos = data.length;
				added['startDate'] = Date.parse(added['startDate']);
				added['endDate'] = Date.parse(added['endDate']);
				post("/api/event/create/",added).then(
					function (res){
						let {data} = that.state
						data[pos-1].id = res.data
						that.setState({data:data})
					}
				)
			}
			if(changed){
				let newData =[]
				data.forEach(appointment=>{
					if(changed[appointment.id]){
						let c = { ...appointment, ...changed[appointment.id] }
						console.log(c)
						c['startDate'] = Date.parse(c['startDate']);
						c['endDate'] = Date.parse(c['endDate']);
						post("/api/event/update/",c)
							.then(function (res){
								console.log(res)
							})
						newData.push({ ...appointment, ...changed[appointment.id] })
					}else{
						newData.push(appointment)
					}
				})
				data = newData
			}
			if(deleted){
				data = data.filter(appointment => appointment.id !== deleted);
				post("/api/event/delete/", {"event_id": deleted}).then(res=>{console.log(res)})
			}


			this.setState({data:data})
			this.setState({addNewEvent:false})

		}

    }
  
  

  render() {

    const { realData, data, currentViewName, currentDate, resources } = this.state;
	

    return (

      <React.Fragment>
        <ExternalViewSwitcher
          currentViewName={currentViewName}
          onChange={this.currentViewNameChange}
        />
        <Paper>
            <Scheduler data={realData} height={570}>
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
				startIcon={<EventAvailableOutlinedIcon />}
				onClick={this.showAppointmentForm.bind(null,true)} >
			 Add new event
			 </Button>


            {/* <--- Appointment form popup for creation and edit --->  */}
            <Appointments/>

            <AppointmentTooltip showOpenButton showDeleteButton/>
            <ConfirmationDialog />

            <Toolbar />
            <DateNavigator />
            <TodayButton />

            <AppointmentForm visible={this.state.addNewEvent} 
				onVisibilityChange={this.showAppointmentForm.bind(null)}/>

				{/*basicLayoutComponent={BasicLayout} */}
				{/*textEditorComponent={TextEditor}*/}
				{/*/>*/}

            <Resources
                data={resources}
                mainResourceName="label_id"
            />

            </Scheduler>
        </Paper>
      </React.Fragment>
    );
  }
}
