import React, { useEffect, useState, GetStaticPaths } from "react";
import Layout from "../../layout/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/farm.module.scss";
import Link from "next/link";

async function fetchData() {
  const response = await fetch("http://localhost:3001/farms");
  const fetchedData = await response.json();

  return { fetchedData };
}

export default function farm(props) {
  const router = useRouter();
  const [farmList, setFarmList] = useState(props.fetchedData);

  const Data = router.query;
  var Index = parseInt(Data.index) - 1;

  //
  async function reload() {
    const refreshedProps = await fetchData();
    setFarmList(refreshedProps.fetchedData);
  }
  function goSite(url) {
    window.open(url);
  }
  function nodeModal(id) {
    if (document.getElementById(id).style.display) {
      if (document.getElementById(id).style.display == "none") {
        document.getElementById(id).style.display = "block";
      } else {
        document.getElementById(id).style.display = "none";
      }
    } else {
      document.getElementById(id).style.display = "block";
    }
  }
  const [updateTime, setupdateTime] = useState(5000);
  var timeout = setTimeout(reload, updateTime);
  async function updateTimer(id) {
    if (document.getElementById(id)) {
      await clearTimeout(timeout);
      var milisec = document.getElementById(id).value * 60 * 1000;
      setupdateTime(milisec);
    }
  }
  if (Data.index != undefined) {
    useEffect(() => {
      farmList.map((farm) => {
        farm.node.map((node, i) => {
          if (document.getElementById(farm.name + "_node" + (i + 1))) {
            document.getElementById(
              farm.name + "_node" + (i + 1)
            ).style.display = "none";
          }
        });
      });
    }, []);

    var Farm = farmList[Index];
    useEffect(() => {
      sessionStorage.title = "Farm " + (Index + 1) + " : " + Farm.name;
    }, []);
    if (Farm.gateway == "yes") {
      var stylesGateway = styles.gatewayon;
    } else {
      var stylesGateway = styles.gatewayoff;
    }
    return (
      <div className={styles.body}>
        <div className={styles.box_flex}>
          <label className={styles.head}>
            <select
              id="updateEvery"
              onChange={() => updateTimer("updateEvery")}
            >
              <option value={1} selected={true} disabled>
                select
              </option>
              <option value={0.016}>1s</option>
              <option value={0.05}>3s</option>
              <option value={0.1}>6s</option>
              <option value={1}>1min</option>
              <option value={5}>5min</option>
              <option value={10}>10min</option>
              <option value={20}>20min</option>
              <option value={30}>30min</option>
              <option value={60}>60min</option>
            </select>
            <button onClick={reload}>Refresh</button>
            <button onClick={() => goSite("https://google.com")}>
              Dashboard
            </button>
          </label>
        </div>
        <div className={styles.boxpic}>
          <button id="gateway" className={stylesGateway}>
            GateWay
          </button>
          <Image
            src="/farm.png"
            width="800px"
            height="500px"
            placeholder="blur"
          />

          {Farm.node.map((val, index) => {
            var i = index + 1;
            var nodeStyle = "node_" + i; //????????? styles ????????? global.css
            return (
              <div className={nodeStyle}>
                <button onClick={() => nodeModal(Farm.name + "_node" + i)}>
                  {val}
                </button>
                <div id={Farm.name + "_node" + i} className={styles.nodebox}>
                  <button>
                    <a href={"/node/farm" + (Index + 1) + "node" + (index + 1)}>
                      Edit
                    </a>
                  </button>
                  <button
                    className={styles.close}
                    onClick={() => nodeModal(Farm.name + "_node" + i)}
                  >
                    X
                  </button>
                  <p>Node :{i}</p>
                  <p>Updatte Time : xx-xx-xxxx</p>
                  <p>Create : xx-xx-xxxx</p>
                  <p>Status : Online</p>
                  <p>Temp : xx</p>
                  <p>Humi : xx</p>
                  <p>Light : xx</p>
                  <p>Mois : xx</p>
                  <p>EC: xx</p>
                  <p>Relay 1 :On</p>
                  <p>Relay 2 :On</p>
                  <p>Relay 3 :On</p>
                  <p>On/Off on Time : On</p>
                  <p>On/Off on Date : On</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.box}>
          <p>
            <Image
              src="/detail.png"
              width="30px"
              height="30px"
              placeholder="blur"
            />
            <label className={styles.title}>Detail Farm</label>
          </p>
          <p>???????????????????????????: {Farm.detail.type}</p>
          <p>???????????????????????????: {Farm.detail.plant_date}</p>
          <p>??????????????????????????????????????????????????????????????????: {Farm.detail.havest_date}</p>
          <p>??????????????????????????????: {Farm.detail.fertilizer}</p>
          <p>???????????????: {Farm.detail.amount}</p>
          <p>???????????????????????????????????????: {Farm.detail.havest_amount}</p>
          <p>?????????????????????: {Farm.detail.sell_price}</p>
          <p>????????????????????????: {Farm.detail.market_price}</p>
        </div>
      </div>
    );
  } else {
    return <div>Loading..</div>;
  }
}
farm.Layout = Layout;
farm.getInitialProps = fetchData;
