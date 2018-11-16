// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { WHITE, RED } from '../../utils/colors';
import { getQuestions, activateQuestion, deleteQuestion } from '../../services/questions.service';
import { Question } from '../../types/question.type';

/* TODO: Question titles longer than X character should be abbreviated */

class QuestionList extends Component {
  componentDidMount() {
    this.props.handleGetQuestions();
  }
  handleActivate(question: Question) {
    this.props.handleActivateQuestion(question);
  }
  handleDelete(id: string) {
    this.props.handleDeleteQuestion(id);
  }
  render() {
    const { questions } = this.props;

    return (
      <View style={styles.container}>
        {
          questions
          ? <View>
            {
              Object.keys(questions).map((key, index) => (
                <Swipeout 
                  key={questions[key].id}
                  right={[{
                    text: 'Delete',
                    color: WHITE,
                    backgroundColor: RED,
                    onPress: () => this.handleDelete(questions[key].id)
                  }]}
                >
                  <ListItem
                    title={questions[key].text}
                    onPress={() => this.handleActivate(questions[key])}
                    rightIcon={questions[key].active && <View style={styles.greenCircle}/>}
                    rightTitle={questions[key].active ? "Active" : ""}
                  />
                </Swipeout>
              ))
            }
          </View>
          : <View><Text>Loading...</Text></View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  handleGetQuestions: () => dispatch(getQuestions()),
  handleActivateQuestion: (question) => dispatch(activateQuestion(question)),
  handleDeleteQuestion: (id) => dispatch(deleteQuestion(id))
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  greenCircle: {
    width: 10,
    height: 10,
    borderRadius: 10/2,
    backgroundColor: '#39FF14',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);