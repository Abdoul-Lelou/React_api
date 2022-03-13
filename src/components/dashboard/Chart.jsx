import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import { styled } from '@mui/material/styles';
import { scalePoint } from 'd3-scale';

const data = [
  { year: '2010', android: 67225, ios: 46598 },
  { year: '2011', android: 179873, ios: 90560 },
  { year: '2012', android: 310088, ios: 118848 },
  { year: '2015', android: 539318, ios: 189924 },
];

const PREFIX = 'Demo';

const classes = {
  chart: `${PREFIX}-chart`,
};

const StyledChartRoot = styled(Chart.Root)(() => ({
  [`&.${classes.chart}`]: {
    paddingRight: '20px',
  },
}));

const ChartRoot = props => (
  <StyledChartRoot {...props} className={classes.chart} />
);
const LegendRoot = props => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const LegendLabel = props => (
  <Legend.Label {...props} sx={{ pt: 1 }} />
);
const LegendItem = props => (
  <Legend.Item {...props} sx={{ flexDirection: 'column' }} />
);



export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,cour:[]
    };
  }

  componentDidMount() { 
     this.getUsers()
   }

  componentDidUpdate(prevProps, prevState) { 
    //  this.getUsers()
    
  } 

  getUsers=()=>{
      const bearer_token= localStorage.getItem('tokenDjango');
  
      return fetch("http://localhost:8000/api/cour", {
  
        method: 'GET',
               headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${bearer_token}`
            },
            
      }).then((res) => res.json())
        .then((res,index) => {
             this.setState({cour:res.data})
             console.log(this.state.cour) 
        })
        .catch((error) => {
            console.log(error)
        });
    }

  
  
  render() {
    const { data: chartData } = this.state;
  
    return (
      // <Paper>
        <Chart
          data={chartData}
          rootComponent={ChartRoot}
        >
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis />
          <ValueAxis />

          <AreaSeries
            name="Android"
            valueField="android"
            argumentField="year"
          />
          <AreaSeries
            name="iOS"
            valueField="ios"
            argumentField="year"
          />
          <Animation />
          <Legend
            position="bottom"
            rootComponent={LegendRoot}
            itemComponent={LegendItem}
            labelComponent={LegendLabel}
          />
          <Title
            text="Worldwide Sales to End Users by OS"
          />
        </Chart>
      // {/* </Paper> */}
    );

  }
}
