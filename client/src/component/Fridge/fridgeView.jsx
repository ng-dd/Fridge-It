import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Popup, Button, Input, Form } from 'semantic-ui-react';

import ItemListView from './itemListView.jsx';
import ItemAddition from './itemAddition.jsx';

import * as fridgeActions from '../../actions/fridgeActions.js';
import * as itemActions from '../../actions/itemActions.js';
import * as graphActions from '../../actions/graphActions.js';
import styles from '../../../public/fridge.css';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import  { PieChart, Pie, Sector, Cell } from 'recharts';
import { Treemap } from 'recharts';

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomizedContent = ({ root, depth, x, y, width, height, index, payload, colors, rank, name }) => {

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor(index / root.children.length * 6)] : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {
          depth === 1 ?
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
          : null
        }
        {
          depth === 1 ?
          <text
            x={x + 4}
            y={y + 18}
            fill="#fff"
            fontSize={16}
            fillOpacity={0.9}
          >
            {index + 1}
          </text>
          : null
        }
      </g>
    );
}

class Fridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      macroView: false,
      calories: false,
      types: false,
      fridge: true
    }
    this.filterItems = this.filterItems.bind(this);
  }
  
  //get correct fridge from database
  componentDidMount() {
    // this.props.itemActions.getMacros('chicken');
    this.props.fridgeActions.getFridge(localStorage.getItem('visitorId') || localStorage.getItem('name'));
    let state = this;
    setTimeout(() => {
      this.props.itemActions.getItems(localStorage.getItem('fId'));
    }, 500);
  };

  //helper function to render each category list by type 
  filterItems(type) {
    return this.props.items.filter(item => {
      if (item.type === type) {
        return item; 
      }
    })
  };

  renderLabel(props) {
        return <text x={props.x} y={props.y}>{props.name}{' '}{props.calories + '/ LB'}</text>;
  }
  
  render() {

    let graphOptions = [
      {text: 'Macro nutrient View', value: 'macro'},
      {text: 'Calorie View', value: 'cals'},
      {text: 'Types View', value: 'type'},
      {text: 'Mario 3 view', value: 'mario'},
      {text: 'Fridge View', value: 'fridge'}
    ]

    let { fridge, fridgeActions, itemActions } = this.props;
    const types = [
      {
        name: 'produce', 
        position: 'top center',
        display: 'Produce'
      }, 
      {
        name: 'dairy', 
        position: 'top left',
        display: 'Dairy'
      },
      {
        name: 'protein',
        position: 'left center',
        display: 'Protein'
      },
      {
        name: 'grains',
        position: 'top right',
        display: 'Grains'
      }, 
      {
        name: 'frozen',
        position: 'right center',
        display: 'Frozen'
      }, 
      {
        name: 'misc',
        position: 'top left',
        display: 'Misc'
      }
    ]; 
    //form switches fridge views
    //render each item list by category
    //create popup to show list
    if (this.state.macroView === true) {
      return (
        <div>
          <Form>
            <Form.Group inline>
              <Form.Input 
                id='inputFid'
                placeholder='Fridge ID'
              />
              <Form.Button content={'Switch fridge'}
                onClick={(e) => {
                  e.preventDefault();
                  fridgeActions.getFridge(document.getElementById('inputFid').value);
                  localStorage.setItem('visitorId', document.getElementById('inputFid').value);
                  location.reload();
                  document.getElementById('inputFid').value = '';
                }}
              />
              <Form.Select 
              placeholder='Browse Graphs' 
              options={graphOptions}
              id="inputType"
              onChange={(e, {value}) => {
                if (value === 'cals') {
                  this.setState({fridge: false, calories: true, macroView: false, types: false});
                }
                if (value === 'macro') {
                  this.setState({fridge: false, calories: false, macroView: true, types: false});
                }
                if (value === 'type') {
                  this.setState({fridge: false, calories: false, macroView: false, types: true});
                }
                if (value === 'fridge') {
                  this.setState({fridge: true, calories: false, macroView: false, types: false});
                }
              }}
              />
            </Form.Group>
          </Form>
         <ItemAddition />
         <BarChart width={600} height={300} data={this.props.items}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="protein" stackId="a" fill="#8884d8" />
       <Bar dataKey="fat" stackId="a" fill="#82ca9d" />
       <Bar dataKey="carbs" fill="#ffc658"/>
      </BarChart>
        </div>
      )
    }

    if (this.state.calories === true) {
      return (
        <div>
          <Form>
            <Form.Group inline>
              <Form.Input 
                id='inputFid'
                placeholder='Fridge ID'
              />
              <Form.Button content={'Switch fridge'}
                onClick={(e) => {
                  e.preventDefault();
                  fridgeActions.getFridge(document.getElementById('inputFid').value);
                  localStorage.setItem('visitorId', document.getElementById('inputFid').value);
                  location.reload();
                  document.getElementById('inputFid').value = '';
                }}
              />
              <Form.Select 
              placeholder='Browse Graphs' 
              options={graphOptions}
              id="inputType"
              onChange={(e, {value}) => {
                if (value === 'cals') {
                  this.setState({fridge: false, calories: true, macroView: false, types: false});
                }
                if (value === 'macro') {
                  this.setState({fridge: false, calories: false, macroView: true, types: false});
                }
                if (value === 'type') {
                  this.setState({fridge: false, calories: false, macroView: false, types: true});
                }
                if (value === 'fridge') {
                  this.setState({fridge: true, calories: false, macroView: false, types: false});
                }
              }}
              />
            </Form.Group>
          </Form>
         <ItemAddition />
         <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={this.props.items} 
          cx={300} 
          cy={200} 
          labelLine={false}
          label={this.renderLabel}
          outerRadius={120} 
          fill="#8884d8"
          dataKey="calories"
        >
        	{
          	this.props.items.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
        <Tooltip />
      </PieChart>
        </div>
      )
    }

    if (this.state.types === true) {
      return (
        <div>
          <Form>
            <Form.Group inline>
              <Form.Input 
                id='inputFid'
                placeholder='Fridge ID'
              />
              <Form.Button content={'Switch fridge'}
                onClick={(e) => {
                  e.preventDefault();
                  fridgeActions.getFridge(document.getElementById('inputFid').value);
                  localStorage.setItem('visitorId', document.getElementById('inputFid').value);
                  location.reload();
                  document.getElementById('inputFid').value = '';
                }}
              />
              <Form.Select 
              placeholder='Browse Graphs' 
              options={graphOptions}
              id="inputType"
              onChange={(e, {value}) => {
                if (value === 'cals') {
                  this.setState({fridge: false, calories: true, macroView: false, types: false});
                }
                if (value === 'macro') {
                  this.setState({fridge: false, calories: false, macroView: true, types: false});
                }
                if (value === 'type') {
                  this.setState({fridge: false, calories: false, macroView: false, types: true});
                }
                if (value === 'fridge') {
                  this.setState({fridge: true, calories: false, macroView: false, types: false});
                }
              }}
              />
            </Form.Group>
          </Form>
         <ItemAddition />
         <BarChart width={730} height={250} data={this.props.items}>
            <XAxis dataKey="type" />
            <YAxis dataKey="quantity"/>
            <CartesianGrid strokeDasharray="4 4" />
            <Tooltip />
            <Legend />
            <Bar fill="#00C49F" dataKey="quantity"/>
            </BarChart>
        </div>
      )
    } 
    // if (this.state.clicked === true) {
    //   return (
    //     <div>
    //      <Form>
    //         <Form.Group inline>
    //           <Form.Input 
    //             id='inputFid'
    //             placeholder='Fridge ID'
    //           />
    //           <Form.Button content={'Switch fridge'}
    //             onClick={(e) => {
    //               e.preventDefault();
    //               fridgeActions.getFridge(document.getElementById('inputFid').value);
    //               localStorage.setItem('visitorId', document.getElementById('inputFid').value);
    //               location.reload();
    //               document.getElementById('inputFid').value = '';
    //             }}
    //           />

    //           <Form.Button content={'Switch to Graph View'} 
    //             onClick={(e) => {
    //               e.preventDefault();
    //               if (this.state.clicked === true) {
    //                 this.setState({clicked: false})
    //               } else {
    //                 this.setState({clicked: true})
    //               }
    //             }}
    //           />
    //         </Form.Group>
    //       </Form>
    //      <ItemAddition />
    //      <BarChart width={600} height={300} data={this.props.items}
    //         margin={{top: 20, right: 30, left: 20, bottom: 5}}>
    //    <XAxis dataKey="name"/>
    //    <YAxis/>
    //    <CartesianGrid strokeDasharray="3 3"/>
    //    <Tooltip/>
    //    <Legend />
    //    <Bar dataKey="protein" stackId="a" fill="#8884d8" />
    //    <Bar dataKey="fat" stackId="a" fill="#82ca9d" />
    //    <Bar dataKey="carbs" fill="#ffc658"/>
    //   </BarChart>

    //     <BarChart width={730} height={250} data={this.props.items}>
    //         <XAxis dataKey="type" />
    //         <YAxis dataKey="quantity"/>
    //         <CartesianGrid strokeDasharray="4 4" />
    //         <Tooltip />
    //         <Legend />
    //         <Bar fill="#00C49F" dataKey="quantity"/>
    //         </BarChart>
    //         <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
    //     <Pie
    //       data={this.props.items} 
    //       cx={300} 
    //       cy={200} 
    //       labelLine={false}
    //       label={this.renderLabel}
    //       outerRadius={120} 
    //       fill="#8884d8"
    //       dataKey="calories"
    //     >
    //     	{
    //       	this.props.items.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
    //       }
    //     </Pie>
    //   </PieChart>
    //         <Treemap
    //     width={400}
    //     height={200}
    //     data={this.props.items}
    //     dataKey="protein"
    //     ratio={4/3}
    //     stroke="#fff"
    //     fill="#8884d8"
    //     label={this.renderLabel}
    //     content={<CustomizedContent colors={COLORS}/>}
    //     />
    //   </div>
    //   )
    // }
    return (
      <div>
        <h2 className='ui dividing header'>{fridge.name && fridge.name.split('@')[0]}'s Fridge</h2>
        <div>
          <Form>
            <Form.Group inline>
              <Form.Input 
                id='inputFid'
                placeholder='Fridge ID'
              />
              <Form.Button content={'Switch fridge'}
                onClick={(e) => {
                  e.preventDefault();
                  fridgeActions.getFridge(document.getElementById('inputFid').value);
                  localStorage.setItem('visitorId', document.getElementById('inputFid').value);
                  location.reload();
                  document.getElementById('inputFid').value = '';
                }}
              />

              <Form.Select 
              placeholder='Browse Graphs' 
              options={graphOptions}
              id="inputType"
              onChange={(e, {value}) => {
                if (value === 'cals') {
                  this.setState({fridge: false, calories: true, macroView: false, types: false});
                }
                if (value === 'macro') {
                  this.setState({fridge: false, calories: false, macroView: true, types: false});
                }
                if (value === 'type') {
                  this.setState({fridge: false, calories: false, macroView: false, types: true});
                }
                if (value === 'fridge') {
                  this.setState({fridge: true, calories: false, macroView: false, types: false});
                }
              }}
              />  
            </Form.Group>
          </Form>
          <ItemAddition />
        </div>
        <div className={styles.container}>
          {types.map(type => {
              let filteredItems = this.filterItems(type.name);
                return (
                    <Popup
                      trigger={<div className={styles[type.name]}>
                        <div className={styles.text}>{type.display}</div>
                        </div>}
                      flowing
                      hoverable
                      position={type.position}
                    >
                      <ItemListView actions={itemActions} type={type} items={filteredItems}/> 
                    </Popup>
                )
          })}
        </div>
      </div>
    )
  }
}

const fridgeState = (store) => {
  return {
    username: store.auth.username,
    fridge: store.fridge.fridge,
    items: store.items.items,
    posted: store.fridge.posted,
    fetched: store.fridge.fetched,
    macroItems: store.items.macroItems,
    nutrients: store.items.nutrients
  }
};

const fridgeDispatch = (dispatch) => {
  return {
    fridgeActions: bindActionCreators(fridgeActions, dispatch),
    itemActions: bindActionCreators(itemActions, dispatch)
  }
};

export default connect(fridgeState, fridgeDispatch)(Fridge); 