https://github.com/gscept/nebula/blob/master/README.md

# Zip-View

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

Zip-View is a versatile browser for document and image viewing, offering a unique approach by utilizing the popular ZIP file format. This README provides an overview and comparative analysis of Zip-View against traditional PDFs.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Integration](#integration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Instant Display:** Display images instantly by downloading only visible images.
- **Navigation Experience:** Top-down wrap-around viewing with precise panning.
- **Hosting Flexibility:** Local and remote hosting on traditional servers, cloud, or IPFS.
- **User-Friendliness:** No HTML coding required, drag-and-drop functionality, password protection.
- **Cross-Platform Compatibility:** Compatible across Windows, Mac, Linux, iOS, Android.

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/zip-view.git

Table of Contents
1. Getting Started
   + Accessing the Image Viewer
1. Navigating Images
   + Keyboard Support
   + Mouse Support
   + Touch Support
1. Zooming and Panning
   + Keyboard Support
   + Mouse Support
   + Touch Support
1. Loading Images and Zip Files
   + Loading IPFS Image Hierarchy
   + Loading Remote Zip Files
   + Drag and Drop from File Explorer
1. Contact Support
<!-- -->

1. Getting Started
   1. Open web browser.
   1. Navigate to IPFS-View using a URL, which will look something like: https://www.ipfs-view.com?p=your-QID-here.
   1. Press Enter, and the IPFS-View Image Viewer will load the image hierarchy associated with the provided QID.

1. Navigating Images
   - Keyboard Support
     + Left Arrow: Move left.
     + Right Arrow: Move right.
     + Up Arrow: Move up (or use 'K').
     + Down Arrow: Move down (or use 'Space').
     + Enter: Next image.
     + Backspace: Previous image.
     + Home: First image.
     + End: Last image.
     + Esc: Exit full-screen mode.
   - Custom Keyboard Support
     + H: Move left (an alternative to the Left Arrow).
     + J: Move down (an alternative to the Down Arrow or Space).
     + K: Move up (an alternative to the Up Arrow).
     + L: Move right (an alternative to the Right Arrow)
   - Additional Actions
     + / (Forward Slash): Toggle user interface visibility.
     + Tab: Move right.
     + Long-Press: View image details.
     + ?: View advanced image details.
 
1. Zooming and Panning
   - Keyboard Support
     + Plus / Minus: Zoom in and out.
     + Ctrl + 0: Reset zoom to 100%.

   - Mouse Support
     + Scroll Wheel: Zoom in and out.
     + Click and Drag: Pan the zoomed-in image.

   - Touch Support
     + Pinch-Zoom: Zoom in and out.
     + Drag: Pan the zoomed-in image.

1. IPFS and Zip Files
   - To load an IPFS image hierarchy, set the "P" parameter of the URL to the QID (Query ID) associated with the content. 
     + https://www.ipfs-view.com?p=your-QID-here.
   - To load a remote zip file, set the "P" parameter to the file location.
     + https://www.ipfs-view.com?p=https://www.example.com/path/to/your/zipfile.zip
   - To load a images from the desktop, use drag-and-drop or the file explorer:

1. Contact Support
   - Email: support@ipfs-view.com

