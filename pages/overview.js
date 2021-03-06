import Link from "next/link";
import React, { useEffect } from "react";
import Layout from "../layout/layout";
import styles from "../styles/overview.module.scss";
import Image from "next/image";

export default function overview() {
  var farm = [
    {
      name: "Green Farm",
      node: ["Node1", "Node2"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "yes",
      analytic: "yes",
      blockchain: "no",
      created: "2021-04-29",
    },
    {
      name: "Red Farm",
      node: ["Node1", "Node2", "Node3"],
      numnode: "3",
      numparam: "xx",
      numdashb: "xx",
      gateway: "yes",
      analytic: "no",
      blockchain: "no",
      created: "2021-04-29",
    },
    {
      name: "Blue Farm",
      node: ["Node1", "Node2"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "yes",
      analytic: "yes",
      blockchain: "yes",
      created: "2021-04-29",
    },
    {
      name: "Pink Farm",
      node: ["Node1", "Node2"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "no",
      analytic: "no",
      blockchain: "no",
      created: "2021-04-29",
    },
    {
      name: "Orange Farm",
      node: ["Node1"],
      numnode: "1",
      numparam: "xx",
      numdashb: "xx",
      gateway: "no",
      analytic: "no",
      blockchain: "no",
      created: "2021-04-29",
    },
  ];
  return (
    <div className={styles.body}>
      {farm.map((val, index) => {
        return (
          <Link href={"/farm/" + (index + 1)}>
            <div className={styles.box}>
              <p>
                <Image src="/layout/farm.png" width="30px" height="30px" />
                <label className={styles.title}>Farm {index + 1}</label>
                <label className={styles.create_date}>{val.created}</label>
              </p>
              <p>Farm Name: {val.name}</p>
              <p>Number Node: {val.numnode}</p>
              <p>Number Parameter: {val.numparam}</p>
              <p>Number Dashboard: {val.numdashb}</p>
              <p className={styles.highlight}>GateWay: {val.gateway}</p>
              <p className={styles.highlight}>Analytics: {val.analytic}</p>
              <p className={styles.highlight}>Block Chain: {val.blockchain}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

overview.Layout = Layout;
