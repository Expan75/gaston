import React from 'react';
import { Button, View, Text } from 'react-native';
import { getUsers } from '../api/mock';

class HomeScreen extends React.Component {
  state = { users: [], hasLoadedUsers: false, userLoadingErrorMessage: '' }

  loadUsers() {
    this.setState({ hasLoadedUsers: false, userLoadingErrorMessage: '' })
    getUsers()
      .then((res: any) => {
        this.setState({ hasLoadedUsers: true, userLoadingErrorMessage: res.users })
      })
      .catch(this.handleUserLoadingError);
  };

  handleUserLoadingError(res: any) {
    if (res.error === 401) {
      this.props.navigation.navigate('Login');
    } else {
      this.setState({ hasLoadedUsers: false, userLoadingErrorMessage: res.message })
    }
  };

  componentDidMount() {
    this.loadUsers()
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>HomeScreen</Text>
        {this.state.users.map((user) => {
          <Text key={user.email}>{user.email}</Text>
        })}
        <Button title="Log out" onPress={() => this.props.navigation.navigate('Login')} />
      </View>
    );
  };
};

export default HomeScreen;