

export const appointments = [
  {
    id: 0,
    title: 'Watercolor Landscape',
    roomId: 1,
    members: [1],
    startDate: new Date(2023, 1, 21, 9, 30),
    endDate: new Date(2023, 1, 21, 11),
    rRule: '',
  }, {
    id: 1,
    title: 'Oil Painting for Beginners',
    roomId: 2,
    members: [2],
    startDate: new Date(2023, 2, 1, 9, 30),
    endDate: new Date(2023, 2, 1, 11),
    rRule: '',
  }, {
    id: 2,
    title: 'Testing',
    roomId: 3,
    members: [3],
    startDate: new Date(2023, 2, 10, 12, 0),
    endDate: new Date(2023, 2, 11, 13, 0),
    rRule: '',
  }, {
    id: 3,
    title: 'Meeting of Instructors',
    roomId: 4,
    members: [4, 1],
    startDate: new Date(2023, 2, 23, 9, 0),
    endDate: new Date(2023, 2, 26, 9, 15),
    rRule: '',
  }, {
    id: 4,
    title: 'Recruiting students',
    roomId: 5,
    members: [3, 4, 5],
    startDate: new Date(2023, 3, 26, 10, 0),
    endDate: new Date(2023, 3, 26, 11, 0),
    rRule: '',
    exDate: '20170611T100000',
  }, {
    id: 5,
    title: 'Final exams',
    roomId: 3,
    members: [2, 3],
    startDate: new Date(2023, 4, 20, 12, 0),
    endDate: new Date(2023, 4, 20, 13, 35),
    rRule: 'FREQ=YEARLY;BYWEEKNO=24;BYDAY=TH,FR',
  }, {
    id: 6,
    title: 'Monthly Planning',
    roomId: 4,
    members: [1, 3],
    startDate: new Date(2023, 4, 1, 14, 30),
    endDate: new Date(2023, 4, 2, 15, 45),
    rRule: 'FREQ=MONTHLY;BYMONTHDAY=27;COUNT=1',
  }, {
    id: 7,
    title: 'Open Day',
    roomId: 5,
    members: [1, 3, 5],
    startDate: new Date(2023, 4, 16, 9, 30),
    endDate: new Date(2023, 4, 18, 13),
    rRule: 'FREQ=YEARLY;BYYEARDAY=148',
  },
];


