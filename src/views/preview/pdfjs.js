// import PDFJS from 'pdfjs-dist';
//
//
// function renderPDF(id) {
//     //
//     // If absolute URL from the remote server is provided, configure the CORS
//     // header on that server.
//     //
//     const url = './files/view/62cee7d6ff703f08647e0bbe';
//
//     //
//     // The workerSrc property shall be specified.
//     //
//     // pdfjsLib.GlobalWorkerOptions.workerSrc =
//     //     '../../node_modules/pdfjs-dist/build/pdf.worker.js';
//
//     PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';
//
//     //
//     // Asynchronous download PDF
//     //
//     const loadingTask = pdfjsLib.getDocument(url);
//     (async () => {
//         const pdf = await loadingTask.promise;
//         //
//         // Fetch the first page
//         //
//         const page = await pdf.getPage(1);
//         const scale = 1.5;
//         const viewport = page.getViewport({ scale });
//         // Support HiDPI-screens.
//         const outputScale = window.devicePixelRatio || 1;
//
//         //
//         // Prepare canvas using PDF page dimensions
//         //
//         const canvas = document.getElementById("the-canvas");
//         const context = canvas.getContext("2d");
//
//         canvas.width = Math.floor(viewport.width * outputScale);
//         canvas.height = Math.floor(viewport.height * outputScale);
//         canvas.style.width = Math.floor(viewport.width) + "px";
//         canvas.style.height = Math.floor(viewport.height) + "px";
//
//         const transform = outputScale !== 1
//             ? [outputScale, 0, 0, outputScale, 0, 0]
//             : null;
//
//         //
//         // Render PDF page into canvas context
//         //
//         const renderContext = {
//             canvasContext: context,
//             transform,
//             viewport,
//         };
//         page.render(renderContext);
//     })();
// }
//
// export default {
//     renderPDF
// }