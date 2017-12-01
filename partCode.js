_createHtmlTemplate: function (param) {
        this._getPrintTemplate().getStore().loadData([[param, param]], true);
        this._getPrintTemplate().setValue(param);
        this._setTemplateItems(this, {});
        var printType = this._getPrintType().getValue();
        var officeId = getOfficeId();
        var templateName = this._getPrintTemplate().getValue();
        var printTemplate = this._getPrintTemplate().getValue();
        if (printType === "" || printTemplate === "") {
            Ext.Msg.alert('警告', '请选择打印模板。');
        } else {
            var editorWindow = new com.oocl.ir4.sps.web.js.print.htmlEditor({
                officeId : officeId,
                printType: printType,
                userCompanyName : userCompanyName,
                allowBlank : false,
                clientWindowId : this.clientWindowId
            })._buildWindow();
            editorWindow.show();
            editorWindow.on("beforeclose", Ext.createDelegate(function () {
                var value = editorWindow.getValue();
                if (H.isEmpty(value.name)) {
                    return;
                }
                var template = "\n" + value.template + "\n";
                var param = {
                    companyName: userCompanyName,
                    officeId: officeId,
                    template: template,
                    type: 'srEnvelope',
                    templateName: templateName
                };
                PrintController.handleTemplate("", param ,function (result) {
                    if (result.success) {
                        H.information('操作成功');
                    } else {
                        H.message('保存失败');
                    }
                });
            }, this));
        }
    },
	
	
<!----------------------------------------------------------------------------------------------------------------->


H.ns('com.oocl.ir4.sps.web.js.print');
com.oocl.ir4.sps.web.js.print.htmlEditor = Ext.extend(
    com.oocl.ir4.sps.framework.web.js.commonUI.form.PopupEditorField, {
        constructor : function(c) {
            c = c || {};
            var config = {
                window : {
                    xtype : 'com.oocl.ir4.sps.web.js.print.htmlEditorWindow',
                    officeId : c.officeId,
                    printType: c.printType,
                    allowBlank : c.allowBlank,
                    clientWindowId : c.clientWindowId,
                    userCompanyName : c.userCompanyName
                }
            };
            H.apply(config, c);
            com.oocl.ir4.sps.web.js.print.htmlEditor.superclass.constructor.call(this, config);
        },
    });