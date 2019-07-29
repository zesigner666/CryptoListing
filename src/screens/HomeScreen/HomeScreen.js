import React, { Component } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import axios from 'axios';
import { getUSDPrice } from '../../services/Utils';
import * as endPoint from '../../../global/Constants';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  static navigationOptions = {
    title: 'Crypto Listing',
  };

  componentDidMount() {
    this.remoteAxios()
  }

  remoteAxios = () =>{
    this.setState({ loading: true });
    axios.defaults.headers.common['X-CMC_PRO_API_KEY'] = endPoint.KEY_TEST;
    axios.get(endPoint.END_POINT_TEST, {
      params: {
        start: '1',
        limit: '70',
      }
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          data: response.data.data,
          error: response.error || null,
          loading: false,
        });
        this.arrayholder = response.data.data;
      })
      .catch(error => {
        Alert.alert('Error fetching data');
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View style={styles.line} />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search currency..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              rightTitle={item.symbol}
              titleStyle={styles.title}
              subtitle={getUSDPrice(item.quote.USD.price)}
              rightSubtitle={item.quote.USD.percent_change_1h}
              rightSubtitleStyle={
                item.quote.USD.percent_change_1h > 0 ?
                {color: 'green'} :
                {color: 'red'}
              }
            />
          )}
          keyExtractor={item => item.symbol}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  line: {
    height: 1,
    width: '90%',
    backgroundColor: '#CED0CE',
    marginLeft: '10%',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  }
};

export default HomeScreen;