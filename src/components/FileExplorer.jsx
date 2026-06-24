import React, { Children, useState } from "react";

const data = [
  {
    id: 1,
    name: "public",
    isFolder: true,
    children: [
      {
        id: 2,
        name: "index.html",
        isFolder: false,
      },
    ],
  },
  {
    id: 3,
    name: "src",
    isFolder: true,
    children: [
      {
        id: 4,
        name: "App.js",
        isFolder: false,
      },
      {
        id: 5,
        name: "index.js",
        isFolder: false,
      },
    ],
  },
  {
    id: 6,
    name: "package.json",
    isFolder: false,
  },
];

const File = ({ data, addNodeToList, deleteNodeFromList }) => {
  const [isExpanded, setIsExpanded] = useState({});
  return (
    <div>
      {data?.map((node) => (
        <div style={{ paddingLeft: "20px" }} key={node.id}>
          {node.isFolder && (
            <span
              style={{
                cursor: "pointer",
                marginRight: "7px",
                fontSize: "16px",
                fontWeight: "500",
              }}
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name],
                }))
              }
            >
              {isExpanded?.[node.name] ? "-" : "+"}
            </span>
          )}
          <span>{node.name}</span>
          {node.isFolder && (
            <>
              <span onClick={() => addNodeToList(node.id, true)}>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/041/444/303/non_2x/new-folder-icon-symbol-design-illustration-vector.jpg"
                  alt="icon"
                  className="icon"
                />
              </span>
              <span onClick={() => addNodeToList(node.id, false)}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHsScy9XJnirBQfZ2jFuQzmfuSO5nrKDA46NYjVhj5mg&s=10"
                  alt="icon"
                  className="icon"
                />
              </span>
            </>
          )}
          <span onClick={() => deleteNodeFromList(node.id)}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr0HunB2YJRiKsZ3j28TxbC0GqI2w4DapOjPlCs27hxA&s=10"
              alt="icon"
              className="icon"
            />
          </span>
          {isExpanded?.[node.name] && node.children && (
            <File
              data={node.children}
              addNodeToList={addNodeToList}
              deleteNodeFromList={deleteNodeFromList}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const FileExplorer = () => {
  const [initialList, setInitialList] = useState(data);

  const addNodeToList = (parentId, isFolder = false) => {
    const name = prompt("Enter Name");
    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now.toString(),
                name: name,
                isFolder: isFolder,
                children: [],
              },
            ],
          };
        }
        if (node.children)
          return { ...node, children: updateTree(node.children) };
        return node;
      });
    };
    setInitialList((prev) => updateTree(prev));
  };

  const deleteNodeFromList = (itemId) => {
    const updatedTree = (list) => {
      return list
        .filter((node) => node.id !== itemId)
        .map((node) => {
          if (node.children)
            return { ...node, children: updatedTree(node.children) };
          return node;
        });
    };
    setInitialList((prev) => updatedTree(prev));
  };

  return (
    <div>
      <h6>FileExplorer</h6>
      <File
        data={initialList}
        addNodeToList={addNodeToList}
        deleteNodeFromList={deleteNodeFromList}
      />
    </div>
  );
};

export default FileExplorer;
