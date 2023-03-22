import React,{useEffect, useState} from 'react';
import Tree from 'react-d3-tree';
import NavBar from './navbar';
import {gettree} from "../Api/actions"

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};

export default function OrgChartTree() {
    const [treeList,settreeList] = useState()
    const getlist=(async()=>{
        let {result,success} = await gettree();
        if(success){
            settreeList(result)
        }
    })
    useEffect(()=>{
        getlist();
    },[])
  return (
    <>
    <NavBar />
    <div id="treeWrapper" style={{ width: '500em', height: '500em', }}>
     {treeList&&<Tree data={treeList}
       orientation={"vertical"}
       centeringTransitionDuration={800}
       translate={{ x: 700, y: 100 }} />}
    </div>
    </>
  );
}
