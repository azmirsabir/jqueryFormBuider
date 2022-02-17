
# jquery Form Builder
This enables anyone to take their complicated or time-consuming processes, and make them simple


## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## Usage/Examples

```javascript
  const form  ={
                    "groups": [
                        {
                            'name': 'requester',
                            'title': "Requester",
                            'size': 12,
                            'right_title': 'Checkbox : <input type="checkbox"/> '
                        },
                        {"name": 'visitor', 'title': "Visitor", 'size': 12},
                        {"name": 'attachments', 'title': "Attachments", 'size': 12}
                    ],
                    'inputs': [
                        {
                            "title": 'Name',
                            "col_size": 4,
                            'message': "we\'ll never share your nme with anyone.",
                            "group": "requester",
                            "attrs": {
                                "type": 'text',
                                "id": "name",
                                "name": 'Name',
                                'placeholder': "Name",
                                "value": "Zizo",
                                "class": "form-control",
                                "required": true,
                                "readonly": true,
                            }
                        },
                        {
                            "title": 'date',
                            "col_size": 4,
                            'message': "we\'ll never share your nme with anyone.",
                            "group": "requester",
                            "attrs": {
                                "type": 'datetime-local',
                                "id": "date",
                                "name": 'date',
                                "class": "form-control",
                                "required": true,
                            }
                        },
                        {
                            "title": 'Password',
                            "col_size": 4,
                            "group": "requester",
                            "attrs": {
                                "type": 'password',
                                "name": 'password',
                                'placeholder': "password",
                                "value": "Zizo",
                                "class": "form-control"
                            }
                        },
                        {
                            "title": 'Date',
                            "col_size": 4,
                            "group": "requester",
                            "attrs": {
                                "type": 'date',
                                "name": "date",
                                "required": true,
                                "class": "form-control",
                            }
                        },
                        {
                            "title": 'Select',
                            "col_size": 4,
                            'message': "You can select multiple option.",
                            "group": "visitor",
                            "attrs": {
                                "type": 'select',
                                "name": "select",
                                "required": true,
                                "class": "selectpicker form-control",
                                "data-style": "border",
                                "data-live-search": "true",
                                "multiple": true,
                                'title': "Choose something"
                            },
                            "options": [
                                {
                                    'title': 'Suly',
                                    'value': 2
                                },
                                {
                                    'title': "Erbil",
                                    'value': 4
                                }
                            ],
                            'optionLabel' : 'title',
                            'optionValue' : 'value'
                        },
                        {
                            "title" : 'Name',
                            "col_size" : 4,
                            "group" : "visitor",
                            "attrs" : {
                                "type" : 'text',
                                "name" : 'Name',
                                'placeholder' : "Name",
                                "value" : "Zizo",
                                "class" : "form-control",
                                "required" : true,
                            }
                        },
                        {
                            "col_size" : 3,
                            "group" : "attachments",
                            "attrs" : {
                                "type" : 'multiple_input',
                                "name" : 'Name',
                                'placeholder' : "Passenger name",
                                "value" : "Zizo",
                                "class" : "form-control",
                                "required" : true,
                            }
                        },
                        {
                            "group" : "attachments",
                            "attrs" : {
                                "type" : 'custom',
                                "html" : '<h1>Custom</h1>',
                            }
                        },
                        {
                            "title" : 'I have car',
                            "col_size" : 4,
                            "group" : "requester",
                            "attrs" : {
                                "type" : 'checkbox',
                                "id":"car",
                                "name" : 'car',
                                "class":"",
                                "required" : true,
                                "readonly":true,
                                "style":"margin-top:35px"
                            }
                        },
                        {
                            "title" : 'Gender',
                            "col_size" : 4,
                            "group" : "requester",
                            "attrs" : {
                                "type" : 'radio',
                                "name" : 'gender',
                                "class":"",
                                "required" : true,
                            },
                            "options" : [
                                {
                                    'title' : 'Male',
                                    'value' : 1
                                },
                                {
                                    'title' : "Female",
                                    'value' : 2
                                }
                            ],

                            'optionLabel' : 'title',
                            'optionValue' : 'value'
                        },
                    ]
                };
  
    $('continer').buildForm(form)

```


## Demo

Insert gif or link to demo


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Authors

- [@AzmirSabir](https://github.com/azmirsabir)
- [@ZeyadSharo](https://www.github.com/zeyadsharo)


