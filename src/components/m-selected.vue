<template>
    <div>
        <p>Выберите дату начала посещения кружка</p>
        <div class="form-group">
            <label>День</label>
            <select type="text" class="form-control">
                <option
                        v-for="selda in selectDay"
                        :key="selda"
                >{{selda}}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label>Месяц</label>
            <select type="text" class="form-control">
                <option>Сентября</option>
                <option>Октября</option>
                <option>Ноября</option>
                <option>Декабря</option>
                <option>Января</option>
            </select>
        </div>
        <div class="form-group">
            <label>Год</label>
            <select type="text" class="form-control">
                <option>2019</option>
                <option>2020</option>
            </select>
        </div>
        <iframe src="https://docs.google.com/gview?url=http://dogovor.1474.ru/web/dog_%D0%98%D0%B0%D0%BD%D0%BE%D0%B2%20%D0%98%D0%B2%D0%B0%D0%BD%20%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%D0%B8%D1%871589399659_.docx&embedded=true&w=250" width="100%" height="250px"></iframe>
        <div>
            <span>Описание кружка </span>
            <div
                    class="form-control"
                    :class="{widTex: message}"
                    v-bind="valTextarea"
            >
                <tr>
                    <td>{{valTextarea.descript}}</td>
                </tr>
                <tr>
                    <td>{{valTextarea.teacherexp}}</td>
                </tr>
                <tr>
                    <td>{{valTextarea.cost}}</td>
                </tr>
                <tr>
                    <td>{{valTextarea.telephone}}</td>
                </tr>

            </div>
            <textarea class="form-control" v-model="valTextarea.telephone"></textarea>
        </div>
        <h1>{{link}}</h1>
        <button class="btn btn-success">Далее</button>
        <button class="btn btn-success" @click="renderDoc">Скачать договор</button>

    </div>
</template>

<script>

    import Docxtemplater from "docxtemplater";
    import PizZip from "pizzip";
    import PizZipUtils from "pizzip/utils/index.js";
    import {saveAs} from "file-saver";
    //eslint-disable-next-line no-unused-vars
    import {AlignmentType, Packer, Paragraph, TextRun} from "docx";

    //import * as docx from "docx";

    // function loadFile(url, callback) {
    //     PizZipUtils.getBinaryContent(url, callback);
    // }

    export default {

        name: "m-selected",
        data() {
            return {
                message: true,
                selectDay: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                word: [],
                word1: 'test',
                link : null,
                href: ''
            }
        },
        props: {
            valTextarea: {
                type: Object,
                default: () => {

                }
            }
        },
        computed: {},

        methods: {
            renderDoc() {

                let result = this.valTextarea;

                PizZipUtils.getBinaryContent('http://p563208.ihc.xyz/wp-content/uploads/2020/04/dogovor.docx', function (
                    error,
                    content
                ) {
                    if (error) {
                        throw error;
                    }
                    let zip = new PizZip(content);
                    let doc = new Docxtemplater(zip);

                    doc.setData({
                        first_name: result.teacher,
                        last_name: new Date().toLocaleDateString(),
                        phone: "0652455478",
                        description: "New Website",
                        test_text: result.telephone
                    });
                    try {
                        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                        doc.render();
                    } catch (error) {
                        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                        // eslint-disable-next-line no-inner-declarations
                        function replaceErrors(key, value) {
                            if (value instanceof Error) {
                                return Object.getOwnPropertyNames(value).reduce(function (
                                    error,
                                    key
                                    ) {
                                        error[key] = value[key];
                                        return error;
                                    },
                                    {});
                            }
                            return value;
                        }

                        console.log(JSON.stringify({error: error}, replaceErrors));

                        if (error.properties && error.properties.errors instanceof Array) {
                            const errorMessages = error.properties.errors
                                .map(function (error) {
                                    return error.properties.explanation;
                                })
                                .join("\n");
                            console.log("errorMessages", errorMessages);
                            // errorMessages is a humanly readable message looking like this :
                            // 'The tag beginning with "foobar" is unopened'
                        }
                        throw error;
                    }
                    let out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    }); //Output the document using Data-URI


                    saveAs(out, `${result.teacher}`+".docx");

                    //let blobUrl = URL.createObjectURL(out)

                });


            },
        }
    }
</script>

<style scoped>


    .form-group label {
        text-align: left;
    }

    .btn {
        margin-bottom: 40px;
        margin-top: 40px;
    }

    .widTex {
        height: 120px;
        display: table;
        text-align: left;
    }
</style>