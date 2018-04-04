import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as StudyActions from '../actions/StudyActions';
import { push } from 'react-router-redux';

export class Help extends Component {

  constructor(props, context) {
    super(props, context);

  }

  render() {
    return(
      <div>
        <section id="intro">
          <h3>Grundlagen</h3>

          <p>{`CoCoQuest dient als einfache Questionnaire App. Diese Fragebögen können via JSON importiert werden.\n
            Ein Fragebogen besteht aus mehreren Tasks oder Aufgaben. Diese kann man sich vorstellen wie eine Gruppierung
            von Fragen. Jeder Task beinhaltet eine oder mehrere Fragen, die von verschiedenem Typ sein können (Single Choice,
            Multiple Choice, SeaScale, etc.).`}</p>
        </section>
        <section id="approach">
          <h3>Vorgehensweise</h3>

          <p>{`Die vorhandenen Studien werden am Startbildschirm gelistet und können entweder gestartet oder gelöscht werden.
            Wird eine Studie ausgewählt, so muss eine Teilnehmernummer eingegeben werden (diese sollte eindeutig sein). Sobald
            dieses Formular abgeschickt wird, startet im Hintergrund ein Timer den Startpunkt (bzw. später dann auch den Endpunkt)
            mit einem Zeitstempel festhält.
            Die Testperson durchläuft jetzt den gesamten Fragebogen und beim Abschluss der Studie werden die Daten gespeichert
            und am Gerät abgelegt.`}
          </p>
        </section>
        <section id="coconut-framework">
          <h3>Bezug zum CoConUT-Framework</h3>
          <p>{`CoCoQuest ist ein Bestandteil des CoConUT-Frameworks.\n Mithilfe von CoConUT können während dem Ausfüllen von
          Fragebögen in CoCoQuest sowohl Biodaten (Herzfrequenz, etc.) als auch Kontext-basierte Informationen
          (Aktivität des Nutzers, Lichtintensität, Umgebungslautstärke) gemessen werden. Dadurch ist es möglich
          die Antworten der Testperson in einen Kontext zu setzen und besser daraus Schlüsse zu ziehen.`}</p>
        </section>
      </div>
    )
  }

}

export default connect(state => ({ studies: state.studies,history:state.history }), dispatch => ({
  studyActions: bindActionCreators(StudyActions, dispatch),
  routeActions: bindActionCreators({  push: push }, dispatch)
}))(Help);