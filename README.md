# CoCoQuest
*based on [Redux DevTools TodoMVC example](https://github.com/unimonkiez/react-cordova-boilerplate)*

This app was originally implemented as part of a bachelor thesis to augment the CoConUT-Framework.
It is now a core part of the CoConUT-Framework.
*CoCoQuest* enables researchers to import JSON-based Questionnaires into the app, which can then be taken by 
multiple test subjects. The evaluated answers get saved with timestamps and can be exported back to JSON.

Questionnaires can currently be either written by hand or generated via a 
webapp which can be found [here](http://wwwlab.cs.univie.ac.at/~schusterl15/cocoquest/#/).

## Data structure

A CoCoQuest compatible JSON-File should look something like this:
```json
{
  "studyID": "this won't be visible to anybody, but should be unique in the app",
  "studyName": "The name of the study which will be shown in the app",
  "description": "Some description which will be shown before the study starts",
  "tasks": [
    {
      "data": [
        {
          "type": "question",
          "question": "The first question in a task is used as entry view for the subtask. Therefore there is no feedbackType."
        },
        {
          "type": "question",
          "question": "This question will be presented as a freetext field with a multiline input.",
          "feedbackType":"freetext"
        },
        # there can be multiple questions per task
      ]
    }, # and there can be multiple tasks per study
  ]
}
```

### Question Types

To enable a richer Questionnaire experience there were some more question types 
(or `feedbackType`s as they are called in the JSON) implemented.
Currently the following feedback types are supported:

- `freetext`
- `sea` to use a sea scale for feedback
- `nasa` for a nasa scale, which can be selected by the user
- `likert` for a likert scale, having options and a scale
- `single choice` for a radio button based selection for options
- `multiple choice` for a checkbox based selection for options

The options are described in the following:

#### Freetext

The freetext feedback is the simplest type and constructed as follows:

```json
{
  "type": "question",
  "question": "The question text the user should answer",
  "feedbackType":"freetext"
},
```

#### Sea

The sea scale needs a scale of points and matching labels for the data points.

```json
{
  "type": "question",
  "feedbackType":"sea",
  "question": "The question which the user should answer by selecting a value",
  "label" : "The label for the scale, sits on top of the bar",
  "scale": [
    {
      "label": "25",
      "value": 25
    }, # and so on
  ],
  "labels": [
    {
      "label": "one",
      "value": 25
    }, # and so on
  ]
}
```

#### Nasa

The nasa scale is also very simple to implement.

```json
{
  "type": "question",
  "feedbackType":"nasa",
  "question": "The question or task based on which the user should select a value on the scale",
  "label" : "Thats a label!",
  "labelLeft" : "Low",
  "labelRight" : "High"
}
```

#### Likert

The likert scale is represented by a grid of radio buttons. On the Y-axis there will be options presented
and on the X-axis there are the options, which can be selected by the user.
This scale also needs two arrays one for options and one for the scale:

```
{
  "type": "question",
  "feedbackType": "likert",
  "question": "The question the user needs to answer via selecting values in the scale",
  "options": [
    "Option 1",
    "Option 2",
    # ...
  ],
  "scale": [
    {
      "label": "Sehr häufig",
      "value": 1
    },
    # the scale is similar to the one in the sea scale
  ]
}
```

#### Single choice / Multiple Choice

The choice types are built up the same way and only need `options` to be passed:

```json
{
  "type": "question",
  "feedbackType": "(single|multiple) choice",
  "question": "the question to be answered",
  "options": [
    {
      "label": "Ja",
      "value": 1
    },
    # and so on
  ]
}
``` 

### Attachment Usage

There is also the possibility to add attachments to the Questionnaire, be it photos, videos or audio.
This can be done by setting the property `type` to `attachment`.

When the `type` property is set correctly, there a three possible settings for `feedbackType`:

- `image`
- `audio`
- `video`

An attachment is built up similarly to a question:

```json 
{
  "type": "attachement",
  "attachmentType": "image|audio|video",
  "description": "Task description to tell the user what to attach, eg. a subject to photograph"
},
```

## Technologies in use
* ES6
* Material UI
* React
* Cordova
* Redux

## Installing for local development
1. Install dependencies: ```yarn install```
2. Install global tools: ```npm install -g cordova```
3. Add your cordova platform by running ```cordova platform add %PLATFORM%``` (android and more)
