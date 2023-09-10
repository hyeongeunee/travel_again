import React, { useEffect } from 'react';
import './Map.css';
import { textOverCut } from '../util/textOverCut';

function Map({ selectedItems, areaData }) {
  useEffect(() => {
    const { kakao } = window;
    const container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(areaData.mapy, areaData.mapx),
      level: areaData.mlevel,
    };
    const map = new kakao.maps.Map(container, options);

    // Marker와 Polyline을 담을 배열
    const markers = [];
    const lines = [];

    // Overlay와 CustomOverlay를 담을 배열
    const overlays = [];
    const customOverlays = [];

    // Map 컴포넌트 내에서 flattenedItems 로컬 변수로 설정
    const flattenedItems = selectedItems.flat();

    // 지도 중심 좌표를 설정하는 함수
    const setMapCenter = () => {
      if (flattenedItems.length > 0) {
        const bounds = new kakao.maps.LatLngBounds();
        flattenedItems.forEach((item) => {
          bounds.extend(new kakao.maps.LatLng(item.mapy, item.mapx));
        });
        map.setBounds(bounds);
      }
    };

    setMapCenter(); // 초기 지도 중심 좌표 설정

    flattenedItems.forEach((item, index) => {
      // Marker 생성
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(item.mapy, item.mapx),
        title: item.title,
        image: new kakao.maps.MarkerImage(
          'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png',
          new kakao.maps.Size(24, 35)
        ),
      });

      markers.push(marker);

      // Overlay 내용 생성
      const overlayContent = `
        <div class="overlaybox">
          <div class="boxtitle" onclick="closeOverlay(${index})">${item.title}</div>
          <div class="first">
            <img src="${item.firstimage}" alt="tour Image" style="width: 100%; height: 100%; object-fit: cover;">
            <div class="triangle text">${index + 1}</div>
            <div class="addr text">${item.addr1}</div>
          </div>
          <span class="title">
            ${textOverCut(item.overview, 102, ' ... ')}
          </span>
        </div>
      `;

      // CustomOverlay 생성
      const customOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(item.mapy, item.mapx),
        content: overlayContent,
        xAnchor: 0.3,
        yAnchor: 0.91,
      });

      customOverlays.push(customOverlay);

      // Marker에 이벤트 리스너 등록
      kakao.maps.event.addListener(marker, 'mouseover', () => customOverlay.setMap(map));
      kakao.maps.event.addListener(marker, 'mouseout', () => customOverlay.setMap(null));
      kakao.maps.event.addListener(marker, 'click', () => customOverlay.setMap(map));
    });

    // Polyline 그리기
    for (let i = 1; i < markers.length; i++) {
      const linePath = [markers[i - 1].getPosition(), markers[i].getPosition()];

      const drawLine = new kakao.maps.Polyline({
        map: map,
        path: linePath,
        strokeWeight: 3,
        strokeColor: '#db4040',
        strokeOpacity: 1,
        strokeStyle: 'solid',
      });

      lines.push(drawLine);
    }

    // 닫기 버튼을 클릭할 때 Overlay를 닫는 함수
    window.closeOverlay = function (index) {
      customOverlays[index].setMap(null);
    };
  }, [selectedItems, areaData.mapx, areaData.mapy, areaData.mlevel]);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '750px',
      }}
    ></div>
  );
}

export default Map;
