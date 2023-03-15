import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Grid,
  GridColumn as Column,
  getSelectedState,
} from '@progress/kendo-react-grid';
import products from './products.json';
const DATA_ITEM_KEY = 'ProductID';
const SELECTED_FIELD = 'selected';
const DetailComponent = (props) => {
  const dataItem = props.dataItem;
  return (
    <Grid data={[{ name: 'test' }, { name: 'test2' }, { name: 'test3' }]}>
      <Column field="name" title="Name" width="300px" />
    </Grid>
  );
};
const App = () => {
  const [data, setData] = React.useState(products);
  const [selectedState, setSelectedState] = React.useState({});
  const onSelectionChange = (event) => {
    console.log(event);
    const newSelectedState = getSelectedState({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEY,
    });
    setSelectedState(newSelectedState);
  };
  const expandChange = (event) => {
    let newData = data.map((item) => {
      if (item.ProductID === event.dataItem.ProductID) {
        item.expanded = !event.dataItem.expanded;
      }
      return item;
    });
    setData(newData);
  };
  return (
    <Grid
      data={data}
      detail={DetailComponent}
      style={{
        height: '400px',
      }}
      expandField="expanded"
      onExpandChange={expandChange}
      selectedField={SELECTED_FIELD}
      selectable={{
        enabled: true,
        drag: false,
        cell: false,
        mode: 'single',
      }}
      onSelectionChange={onSelectionChange}
    >
      <Column field="ProductName" title="Product" width="300px" />
      <Column field="ProductID" title="ID" width="50px" />
      <Column field="UnitPrice" title="Unit Price" width="100px" />
      <Column field="QuantityPerUnit" title="Qty Per Unit" />
    </Grid>
  );
};
ReactDOM.render(<App />, document.querySelector('my-app'));
