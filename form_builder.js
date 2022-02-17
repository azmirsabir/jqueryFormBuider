(function ($) {

    $.fn.createInput = function (option = {}) {
        let settings = $.extend(
            {
                type: 'text',
                value: '',
                placeholder: 'Write something!',
                required: false,
                class:"form-control"
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

        if(form_data.groups){
            $(form_data.groups).each(function (i,group){
                let inputs="";
                if (form_data.inputs) {
                    $(form_data.inputs).each(function (i, input) {
                        if(input.group===group.name){
                            inputs+=generate_form_inputs(input);
                        }
                    })
                }
                res+=generate_group(group,inputs);
            })
        }
        else{
            $(form_data.inputs).each(function (i, input) {
                res+=generate_form_inputs(input);
            })
        }

        return this.append(res);
    };

    function generate_form_inputs(input){
        let inputs=""
        switch (input.attrs.type){
            case "select": inputs +=generate_select(input);break;
            case "text": case "password": case "date" :case "datetime-local" :case "file" : inputs +=generate_text_input(input);break;
            case "table": inputs +=generate_table(input);break;
            case "multiple_input": inputs +=generate_multi_input(input); break;
            case "custom": inputs=input.attrs.html;break;
            case "checkbox": inputs +=generate_checkbox(input);break;
            case "radio": inputs +=generate_radio_group(input);break;
            case "textarea": inputs +=generate_textarea(input);break;
        }
        return inputs;
    }

    function generate_textarea(input){
        const input_size=input.col_size?input.col_size:12;
        const title=input.title?input.title:"No title";
        const input_title=input.attrs.required?'<span>'+title+'<span class="text-danger">  * </span></span>':'<span>'+title+'</span>';
        const small_message=input.message?'<small class="form-text text-muted">'+input.message+'</small>':"";
        const text=input.attrs.text? input.attrs.text :"";

        return '<div class="modal-body col-'+input_size+' my-1">\n' +
            input_title+
            '       <textarea ' + generate_attrs(input.attrs) + ' />'+text+'</textarea>\n' +
            small_message+
            '   </div>';
    }
    function generate_checkbox(input){
        const input_size=input.col_size?input.col_size:12;
        const title=input.title?input.title:"No title";
        const input_title=input.attrs.required?'<span>'+title+'<span class="text-danger">  * </span></span>':'<span>'+title+'</span>';

        return '<div class="modal-body col-'+input_size+' my-1 form-check">\n' +
            '    <input ' + generate_attrs(input.attrs) + '>\n' +
            '    <label class="form-check-label" for="exampleCheck1">'+input_title+'</label>\n' +
            '  </div>';
    }
    function generate_radio_group(input){
        let res="";
        $(input.options).each(function (i,val){
            res+='<div class="form-check form-check-inline">\n' +
                '  <input ' + generate_attrs(input.attrs)+" value="+val.value + '>\n' +
                '  <label class="form-check-label" for="inlineRadio1">'+val.title+'</label>\n' +
                '</div>';
        })
        return '<div class="modal-body col-4"> ' +
            '<span>Gender<span class="text-danger">  * </span></span>'+
            '<div class="d-flex">'+
                res+
            '</div>'+
            '</div>';
    }
    function generate_text_input(input){
        const input_size=input.col_size?input.col_size:12;
        const title=input.title?input.title:"No title";
        const input_title=input.attrs.required?'<span>'+title+'<span class="text-danger">  * </span></span>':'<span>'+title+'</span>';
        const small_message=input.message?'<small class="form-text text-muted">'+input.message+'</small>':"";

        return '<div class="modal-body col-'+input_size+' my-1">\n' +
            input_title+
            '       <input ' + generate_attrs(input.attrs) + ' />\n' +
            small_message+
            '   </div>';
    }
    function generate_select(input){
        const input_size=input.col_size?input.col_size:12;
        const title=input.title?input.title:"No title";
        const input_title=input.attrs.required?'<span>'+title+'<span class="text-danger">  * </span></span>':'<span>'+title+'</span>';
        const small_message=input.message?'<small class="form-text text-muted">'+input.message+'</small>':"";

        let opt = ""
        if (input.options) {
            if(!input.optionValue){
                console.log("optionValue missing!")
            }else if(!input.optionLabel){
                console.log("optionLabel missing!")
            }else{
                $(input.options).each(function (i, option) {
                    opt += "<option value=" + option[input.optionValue] + ">" + option[input.optionLabel] + "</option>";
                })
            }
        }

        return '<div class="modal-body col-'+input_size+' my-1">\n' +
                    input_title+
            '       <select ' + generate_attrs(input.attrs) + ' />\n' +
                        opt+
            '       </select>' +
                    small_message+
            '   </div>';
    }
    function generate_table(input){

    }
    function generate_multi_input(input){
        return '<div class="col-'+input.col_size+' my-1 multi_value_element" id="multi_record_container">\n' +
                ' <div class="">\n' +
                '    <div class="card mb-1">\n' +
                '       <div class="card-body" id="multiple_input_container">\n' +
                '          <i class="fas fa-plus-circle fa-3x m-auto pt-2 korek-color-blue clickable" style="font-size: 1.5rem" onclick="add_multi_records_input(this)"></i>\n' +
                '          <div class="multi-records-input">\n' +
                '             <div class="m-2 m-3">\n' +
                '                <input ' + generate_attrs(input.attrs) + '">\n' +
                '             </div>\n' +
                '             <i class="fas fa-times-circle fa-2x m-auto text-danger clickable" style="position: relative;top: -62px;right: 10px; float:right;" onclick="remove_multi_records_input(this);"></i>\n' +
                '          </div>\n' +
                '       </div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</div>';
    }
    function generate_group(group,inputs){
        const right_title=group.right_title?group.right_title:"";
        return '<div class="card col-'+group.size+' mt-1">\n' +
            '   <div class="card-body ">\n' +
            '      <div class="row no-gutters align-items-center justify-content-between">\n' +
            '         <div class="h6 font-weight-bold text-info text-uppercase mb-1">\n' +
                        group.title+
            '         </div>\n' +
            '         <div class="h6 font-weight-bold text-dark float-right mb-1">\n' +
                        right_title+
            '         </div>\n' +
            '      </div>\n' +
            '      <div class="row">\n' +
                    inputs +
            '      </div>\n' +
            '   </div>\n' +
            '</div>';
    }
    function generate_attrs(input){
        const multiple=input.multiple?" multiple ":"";
        const required=input.required?" required ":"";
        const readonly=input.readonly?" readonly ":"";

        const res=multiple+" " +readonly+" "+required;

        let input_attrs = Object.keys(input).reduce(function (previous, key) {
            if(key!=='multiple' && key!=='required' && key!=='readonly') {
                previous += ' ' + key + '= \"' + input[key] + "\"";
            }
            return previous;

        }, '');

        return input_attrs+res;
    }

}(jQuery));

function remove_multi_records_input(remove_btn_ref){
    const input_container = $(remove_btn_ref).parent();
    if(input_container.parent().find('input').length>1){
        input_container.remove();
    }else{
        input_container.parent().find('input').val('');
    }
}
function add_multi_records_input(){
    const clone = $($('#multiple_input_container').find('.multi-records-input')[0]).clone();
    clone.find('input').val('');
    $('#multiple_input_container').append(clone);
}
