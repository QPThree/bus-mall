# Bus Mall - Lab 11+

## Skills Displayed

* Dynamic Rendering

* Object Oriented Programming

* Queue array with constructor and prototype methods

* Charts ("bar" and "polar area") via chart.js and canvas elements

## Overview

Bus mall application gives three images. Images are selected based on user input of which product is most desired. Images are  Javascript objects with properties storing their src, names, and file extensions.

A queue object is constructed and defined to push() and shift() as images are added. Queue is used to validate that images are not added consecutively or in duplicates.

Image object "clicks" and "views" are contained, and passed as data to our Chart objects.

## Author: Quentin P Young III

## Reflections and Comments

First time implementing a Queue constructor and object. Also first time utilizing chart.js and visualing displaying data.   Clear value in creating the queue object. Saved me some lines of code in my renderItems() function, as well as multiple global variables which were no longer needed. In short, the single queue array replaced the jobs of multiple other components.
