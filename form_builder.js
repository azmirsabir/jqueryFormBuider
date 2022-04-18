(function ($) {



    $.fn.getFormData= function () {
        return deserializeFormData(this.serialize())
    }

    function deserializeFormData(query) {
        var pairs, i, keyValuePair, key, value, map = {};
        if (query.slice(0, 1) === '?') {
            query = query.slice(1);
        }
        if (query !== '') {
            pairs = query.split('&');
            let availableKeys = [];
            for (i = 0; i < pairs.length; i += 1) {
                keyValuePair = pairs[i].split('=');
                key = decodeURIComponent(keyValuePair[0]);
                value = (keyValuePair.length > 1) ? decodeURIComponent(keyValuePair[1]) : undefined;
                if (availableKeys.includes(key)) {
                    if (Array.isArray(map[key])) {
                        map[key] = map[key].concat([value])
                    } else if ($('#' +map[key]).attr('type') === 'checkbox') {
                        map[key] = 1
                    } else {
                        map[key] = [map[key], value]
                    }
                }
                else {
                    availableKeys.push(key)
                    if (value==='on' && $('#'+key).attr('type')==='checkbox')                    {
                        value=1
                    }
                    map[key] = value;
                }
            }
        }
        return map;
    }
    let selectIds = []

    $.fn.createInput = function (option = {}) {
        let settings = $.extend(
            {
                type: 'text',
                value: '',
                placeholder: 'Write something!',
                required: false,
                class: "form-control"
            },
            option
        );

        let res = Object.keys(settings).reduce(function (previous, key) {
            previous += ' ' + [key] + '= \"' + settings[key] + "\"";
            return previous;
        }, '');

        return this.append('<input ' + res + ' />');
    };

    $.fn.buildForm = function (form_data = []) {
        let res = "";

        if (form_data.groups) {
            $(form_data.groups).each(function (i, group) {
                let inputs = "";
                if (form_data.inputs) {
                    $(form_data.inputs).each(function (i, input) {
                        if (input.group === group.name) {
                            inputs += generate_form_inputs(input);
                        }
                    })
                }
                res += generate_group(group, inputs);
            })
        } else {
            $(form_data.inputs).each(function (i, input) {
                res += generate_form_inputs(input);
            })
        }

        return this.append(res);
    };

    function generate_form_inputs(input) {
        let inputs = ""


        switch (input.attrs.type) {
            case "select":
                inputs += generate_select(input);
                break;
            case "text":
            case "password":
            case "date" :
            case "datetime-local" :
            case "file" :
            case "number" :
                inputs += generate_text_input(input);
                break;
            case "table":
                inputs += generate_table(input);
                break;
            case "multiple_input":
                inputs += generate_multi_input(input);
                break;
            case "custom":
                inputs = input.attrs.html;
                break;
            case "checkbox":
                inputs += generate_checkbox(input);
                break;
            case "radio":
                inputs += generate_radio_group(input);
                break;
            case "textarea":
                inputs += generate_textarea(input);
                break;
            case "input_unit":
                inputs += generateInputUnit(input)
                break;
            case "dynamic_input":
                inputs += generateDynamicInput(input)
                break;
        }
        return inputs;
    }

    function generateInputUnit(input) {
        const input_size = input.col_size ? input.col_size : 12;
        const title = input.title ? input.title : "No title";
        const input_title = input.attrs.required ? '<span>' + title + '<span class="text-danger">  * </span></span>' : '<span>' + title + '</span>';
        const small_message = input.message ? '<small class="form-text pt-0 text-muted">' + input.message + '</small>' : "";
        const input_unit = input.unit_char ?? '@';


        return '<div class="modal-body col-' + input_size + ' ">\n' + input_title +
            '<div class="input-group  mr-sm-2">' +
            '   <input ' + generate_attrs(input.attrs) + '>' +
            '  <div class="input-group-prepend">' +
            ' <div class="input-group-text">' + input_unit + '</div>' +
            '</div>' +
            '</div>' + small_message + '</div>';


    }

    function generate_textarea(input) {
        const input_size = input.col_size ? input.col_size : 12;
        const title = input.title ? input.title : "No title";
        const input_title = input.attrs.required ? '<span>' + title + '<span class="text-danger">  * </span></span>' : '<span>' + title + '</span>';
        const small_message = input.message ? '<small class="form-text text-muted">' + input.message + '</small>' : "";
        const text = input.attrs.text ? input.attrs.text : "";

        return '<div class="modal-body col-' + input_size + ' ">\n' +
            input_title +
            '       <textarea ' + generate_attrs(input.attrs) + ' />' + text + '</textarea>\n' +
            small_message +
            '   </div>';
    }

    function generate_checkbox(input) {
        const input_size = input.col_size ? input.col_size : 12;
        const title = input.title ? input.title : "No title";
        const input_title = input.attrs.required ? '<span>' + title + '<span class="text-danger">  * </span></span>' : '<span>' + title + '</span>';

        return '<div class="modal-body col-' + input_size + ' form-check">\n' +
            '    <input ' + generate_attrs(input.attrs) + '>\n' +
            '    <label class="form-check-label" for="exampleCheck1">' + input_title + '</label>\n' +
            '  </div>';
    }

    function generate_radio_group(input) {
        let res = "";
        $(input.options).each(function (i, val) {
            res += '<div class="form-check form-check-inline">\n' +
                '  <input ' + generate_attrs(input.attrs) + " value=" + val.value + '>\n' +
                '  <label class="form-check-label" for="inlineRadio1">' + val.title + '</label>\n' +
                '</div>';
        })
        return '<div class="modal-body col-4"> ' +
            '<span>Gender<span class="text-danger">  * </span></span>' +
            '<div class="d-flex">' +
            res +
            '</div>' +
            '</div>';
    }

    function generate_text_input(input) {
        const input_size = input.col_size ? input.col_size : 12;
        const title = input.title ? input.title : "No title";
        const input_title = input.attrs.required ? '<span>' + title + '<span class="text-danger">  * </span></span>' : '<span>' + title + '</span>';
        const small_message = input.message ? '<small class="form-text text-muted">' + input.message + '</small>' : "";

        return '<div class="modal-body col-' + input_size + ' ">\n' +
            input_title +
            '       <input ' + generate_attrs(input.attrs) + ' />\n' +
            small_message +
            '   </div>';
    }

    function generate_select(input) {
        const input_size = input.col_size ? input.col_size : 12;
        const title = input.title ? input.title : "No title";
        const input_title = input.attrs.required ? '<span>' + title + '<span class="text-danger">  * </span></span>' : '<span>' + title + '</span>';
        const small_message = input.message ? '<small class="form-text text-muted">' + input.message + '</small>' : "";

        let opt = ""
        if (input.options) {
            if (!input.optionValue) {
                console.log("optionValue missing!")
            } else if (!input.optionLabel) {
                console.log("optionLabel missing!")
            } else {
                $(input.options).each(function (i, option) {
                    opt += "<option value=" + option[input.optionValue] + ">" + option[input.optionLabel] + "</option>";
                })
            }
        }

        return '<div class="modal-body col-' + input_size + '">\n' +
            input_title +
            '       <select ' + generate_attrs(input.attrs) + ' />\n' +
            opt +
            '       </select>' +
            small_message +
            '   </div>';
    }

    function generate_table(input) {

    }


    function generateDynamicInput(input) {
        const input_size = input.col_size ? input.col_size : 12;
        const title = input.title ? input.title : "No title";
        const input_title = input.attrs.required ? '<span>' + title + '<span class="text-danger">  * </span></span>' : '<span>' + title + '</span>';
        const small_message = input.message ? '<small class="form-text text-muted">' + input.message + '</small>' : "";

        var addBtnFunction = "addRow" + input.attrs.name
        var inputRowId = 'inputFormRow' + input.attrs.name
        var newBtnFunction = 'newRow' + input.attrs.name
        var removeId = 'removeRow' + input.attrs.name


        let add = 'addDynamicRow('+JSON.stringify(inputRowId).trim()+ ','+ JSON.stringify(newBtnFunction.toString()).trim() + ')';
        let script = `<script></script>`

        return '<div class="modal-body col-' + input.col_size + ' ">\n'
            + title +
            '                                <div id="' + inputRowId + '">\n' +
            '                                    <div class="input-group mb-3">\n' +
            '                                        <input ' + generate_attrs(input.attrs) + '>\n' +
            '                                        <div class="input-group-append">\n' +
            '                                            <button id="' + removeId + '" type="button" class="btn btn-danger" inputrowid="'+inputRowId+'"   onclick="removeDynamicRow(this)">Remove</button>\n' +
            '                                        </div>\n' +
            '                                    </div>\n' +
            '                                </div>\n' +
            '                                <div id="' + newBtnFunction + '"></div>\n' +
            '                                <button onclick="addDynamicRow(this)"  inputrowid="'+inputRowId+'"   newbtnfunction="'+newBtnFunction+'"   id="' + addBtnFunction + '" type="button" class="btn btn-info">Add Row</button>\n' +
            '                            </div> ';


    }


    function generate_group(group, inputs) {
        const right_title = group.right_title ? group.right_title : "";
        return '<div class="card col-' + group.size + ' mt-1">\n' +
            '   <div class="card-body ">\n' +
            '      <div class="row no-gutters align-items-center justify-content-between">\n' +
            '         <div class="h6 font-weight-bold text-info text-uppercase mb-1">\n' +
            group.title +
            '         </div>\n' +
            '         <div class="h6 font-weight-bold text-dark float-right mb-1">\n' +
            right_title +
            '         </div>\n' +
            '      </div>\n' +
            '      <div class="row">\n' +
            inputs +
            '      </div>\n' +
            '   </div>\n' +
            '</div>';
    }

    function generate_attrs(input) {
        const multiple = input.multiple ? " multiple " : "";
        const required = input.required ? " required " : "";
        const readonly = input.readonly ? " readonly " : "";

        const res = multiple + " " + readonly + " " + required;

        let input_attrs = Object.keys(input).reduce(function (previous, key,) {
            if (key === 'type' && input[key] === 'input_unit') {
                input[key] = input['input_type']
            }
            if (key !== 'multiple' && key !== 'required' && key !== 'readonly') {
                previous += ' ' + key + '= \"' + input[key] + "\"";
            }
            return previous;

        }, '');

        return input_attrs + res;
    }

}(jQuery));

function addDynamicRow(btn) {
 let newBtnFunction= btn.getAttribute('newbtnfunction')
let inputRowId=btn.getAttribute('inputrowid')
    const clone = $('#' + inputRowId).clone();
    clone.find('input').val('');
    $('#' + newBtnFunction).append(clone);
}

function removeDynamicRow(row) {
  let  inputRowId=row.getAttribute('inputRowId')
    if ($('#' + inputRowId).parent().find('input').length > 1) {
        row.closest('#' + inputRowId).remove();
    } else {
        $('#' + inputRowId).parent().find('input').val('');
    }
}

function remove_multi_records_input(remove_btn_ref) {
    const input_container = $(remove_btn_ref).parent();
    if (input_container.parent().find('input').length > 1) {
        input_container.remove();
    } else {
        input_container.parent().find('input').val('');
    }
}

function isDate(s) {
    return isNaN(s) && !isNaN(Date.parse(s));
}
function add_multi_records_input() {
    const clone = $($('#multiple_input_container').find('.multi-records-input')[0]).clone();
    clone.find('input').val('');
    $('#multiple_input_container').append(clone);
}
function populateDataToForm(form_id, formData) {
    let available_form_data = getFormData(form_id)
    $.each(formData, function (key, value) {
        if (key in available_form_data) {
            let element_type = getElementType(key, form_id)
            if (element_type) {
                {
                    if (isDate(value)) {
                        value = getFormattedDate(value);
                    }
                    let ele_id = '#' + form_id + ' ' + element_type.toLowerCase() + '[name=' + key + ']'
                    $(ele_id).val(value)
                }
            }
        }
    });
    $('.selectpicker').selectpicker('refresh')
}
function getFormattedDate(date) {
    return formatDate(date.substring(0, 10).replace(/-/g, '/'))
}

function getElementType(id, form_id) {
    return $('#' + form_id + ' #' + id).prop('tagName');
}


