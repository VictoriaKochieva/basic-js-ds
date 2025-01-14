const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
  constructor() {
    this.treeRoot = null
  }

  root() {
    return this.treeRoot
  }

  add(data) {
    const node = new Node(data)

    if(!this.treeRoot) {
      this.treeRoot = node;
      return
    }

    let currentNode = this.treeRoot

    while(currentNode){
      if(node.data < currentNode.data) {
        if(!currentNode.left) {
          currentNode.left = node
          return 
        }

        currentNode = currentNode.left
      }
  
      if(node.data > currentNode.data) {
        if(!currentNode.right) {
          currentNode.right = node
          return
        } 
        currentNode = currentNode.right
      }
    }
  }

  has(data) {
    if(this.find(data)) {
      return true
    } else return false
  }

  find(data) {

    return findEl(this.treeRoot, data)

    function findEl(node, data)  {
      if(!node) {
        return null
      }
      
      if(node.data === data) {
        return node
      } 
      
      if(data < node.data) {
        return findEl(node.left, data) 
      } 

      else return findEl(node.right, data) 
    }
  }

  remove(data) {
    //put in node returned result
    this.treeRoot = removeNode(this.treeRoot, data)

    function removeNode(node, data) {
      if(!node) {
        return null
      } 

      if(node.data > data) {
        node.left = removeNode(node.left, data)
        return node
      }

      else if(node.data < data) {
        node.right = removeNode(node.right, data)
        return node
      }
      
      else {
        //if it's a leaf
        if(!node.left && !node.right) {
          return null
        }

        if(!node.right) {
          node = node.left
          return node
        }

        if(!node.left) {
         node = node.right
         return node
        }

        //if has both of child
          let rightMin = node.right // from right min

          while(rightMin.left) {
            rightMin = rightMin.left
          }

          node.data = rightMin.data
          node.right =  removeNode(node.right, rightMin.data)
          return node
      }
    }
  }
  
               //     2
               // 1        7
               //        4   8
                //              32
                //           12    14

  min() {
   if(!this.treeRoot) {
     return null
   }

   let node = this.treeRoot

   while(node.left) {
     node = node.left
   }

   return node.data

  }

  max() {
    if(!this.treeRoot) {
      return null
    }
 
    let node = this.treeRoot
 
    while(node.right) {
      node = node.right
    }
 
    return node.data
  }

}