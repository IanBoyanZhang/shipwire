# shipwire

## Coding challenge
[Optimizing shipping orders](https://www.shipwire.com/w/jobs/optimizing-shipping-orders/)
[Coding Puzzles](https://www.shipwire.com/w/jobs/puzzles-welcome/)

# App requirements 

Product definition:
```javascript
Model: {
  Name
  Description
  Length
  Height
  Weight
  Value //in US Dollars
}
```
# Reading the FW source code 

TODO: Make inheritence/mixin/composition map Mixin is equivalent to multiple inheritance

TODO: Better Template Engine

TODO: Use strict // Semicolon and Comma?

TODO: Read class injection part of code

```javascript
FW.Component could contain multiple components which are maintained through FW.ComponentList
FW.Abstractmodel = FW.Object.extend
FW.Component = FW.Object.extent
FW.ComponentList = FW.AbstractModel.extend
FW.Model = FW.AbstractModel.extend
FW.List = FW.Object.extend   // with models?
```
Create a `FW.Component`

--> Give template

Event Mechanism:
  Synchronous event system
Events:
```javascript
'load',  // ? Add?
'unload',
'change',
'add',
'remove',
```

Model events: 
```javascript
'change'
```
Render:

Component.components.append has built-in template engine

Debug info:
No template available

1st argument in append() is Component Name, for 'different Components', the name has to be different
3rd argument in append() is DOMSelector if given DOMSelector doesn't match any current DOM element, no error info will be given

References:
[1] [What is a model in Backbone](https://cdnjs.com/libraries/backbone.js/tutorials/what-is-a-model);
