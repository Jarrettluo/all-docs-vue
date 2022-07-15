<!--<template>-->
<!--    <div id="app1">-->
<!--        <div id="pageContainer" style="position: absolute">-->
<!--            <div id="viewer"></div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--import "pdfjs-dist/web/pdf_viewer.css";-->
<!--import * as pdfjsLib from "pdfjs-dist";-->
<!--import * as pdfjsViewer from "pdfjs-dist/web/pdf_viewer";-->
<!--import "pdfjs-dist/build/pdf.worker.entry";-->
<!--import * as pdfjsSandbox from "pdfjs-dist/build/pdf.sandbox.js";-->

<!--pdfjsLib.GlobalWorkerOptions.workerSrc = window.pdfjsWorker;-->

<!--export default {-->
<!--    name: "App",-->
<!--    components: {},-->
<!--    async mounted() {-->
<!--        if (!pdfjsLib.getDocument || !pdfjsViewer.PDFViewer) {-->
<!--            // eslint-disable-next-line no-alert-->
<!--            alert(-->
<!--                "Please build the pdfjs-dist library using\n  `gulp dist-install`"-->
<!--            );-->
<!--        }-->

<!--        // Some PDFs need external cmaps.-->
<!--        // const CMAP_URL = './cmaps/';-->
<!--        const CMAP_URL = "./cmaps/";-->
<!--        const CMAP_PACKED = true;-->

<!--        const DEFAULT_URL =  'http://81.69.247.172:8082/files/view/62cee7d6ff703f08647e0bbe';-->
<!--        // To test the AcroForm and/or scripting functionality, try e.g. this file:-->
<!--        // "../../test/pdfs/160F-2019.pdf"-->

<!--        const ENABLE_XFA = true;-->
<!--        const SEARCH_FOR = ""; // try "Mozilla";-->

<!--        // const SANDBOX_BUNDLE_SRC =-->
<!--        //     '../../node_modules/pdfjs-dist/build/pdf.sandbox.js';-->
<!--        const SANDBOX_BUNDLE_SRC = pdfjsSandbox;-->

<!--        const container = document.getElementById("pageContainer");-->

<!--        const eventBus = new pdfjsViewer.EventBus();-->

<!--        // (Optionally) enable hyperlinks within PDF files.-->
<!--        const pdfLinkService = new pdfjsViewer.PDFLinkService({-->
<!--            eventBus,-->
<!--        });-->

<!--        // (Optionally) enable find controller.-->
<!--        const pdfFindController = new pdfjsViewer.PDFFindController({-->
<!--            eventBus,-->
<!--            linkService: pdfLinkService,-->
<!--        });-->

<!--        // (Optionally) enable scripting support.-->
<!--        const pdfScriptingManager = new pdfjsViewer.PDFScriptingManager({-->
<!--            eventBus,-->
<!--            sandboxBundleSrc: SANDBOX_BUNDLE_SRC,-->
<!--        });-->

<!--        const pdfViewer = new pdfjsViewer.PDFViewer({-->
<!--            container,-->
<!--            eventBus,-->
<!--            linkService: pdfLinkService,-->
<!--            findController: pdfFindController,-->
<!--            scriptingManager: pdfScriptingManager,-->
<!--            enableScripting: true, // Only necessary in PDF.js version 2.10.377 and below.-->
<!--        });-->
<!--        pdfLinkService.setViewer(pdfViewer);-->
<!--        pdfScriptingManager.setViewer(pdfViewer);-->

<!--        eventBus.on("pagesinit", function () {-->
<!--            // We can use pdfViewer now, e.g. let's change default scale.-->
<!--            pdfViewer.currentScaleValue = "page-width";-->

<!--            // We can try searching for things.-->
<!--            if (SEARCH_FOR) {-->
<!--                eventBus.dispatch("find", { type: "", query: SEARCH_FOR });-->
<!--            }-->
<!--        });-->

<!--        // Loading document.-->
<!--        const loadingTask = pdfjsLib.getDocument({-->
<!--            url: DEFAULT_URL,-->
<!--            cMapUrl: CMAP_URL,-->
<!--            cMapPacked: CMAP_PACKED,-->
<!--            enableXfa: ENABLE_XFA,-->
<!--        });-->
<!--        const pdfDocument = await loadingTask.promise;-->
<!--        // Document loaded, specifying document for the viewer and-->
<!--        // the (optional) linkService.-->
<!--        pdfViewer.setDocument(pdfDocument);-->

<!--        pdfLinkService.setDocument(pdfDocument, null);-->
<!--    },-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--#pageContainer {-->
<!--    position: absolute;-->
<!--    left: 50%;-->
<!--    transform: translateX(-50%);-->
<!--}-->
<!--#pageContainer .page {-->
<!--    position: relative;-->
<!--    border: 1px solid black;-->
<!--    margin-bottom: 20px;-->
<!--    overflow: hidden;-->
<!--    box-sizing: border-box;-->
<!--}-->
<!--</style>-->