import { useEffect } from 'react';
const { kakao } = window;

function BigMapItem({ selectedItems, areaData, day }) {
    useEffect(() => {
        const { kakao } = window;
        const container = document.getElementById("map");
    
        const options = {
          center: new kakao.maps.LatLng(areaData.mapy, areaData.mapx),
          level: areaData.mlevel,
        };
        const map = new kakao.maps.Map(container, options);
        const markers = [];
        const overlays = [];
    
        // Map 컴포넌트 내에서 flattenedItems 로컬 변수로 설정
        const flattenedItems = selectedItems[day].flat();
    
        const markerImage = new kakao.maps.MarkerImage(
          "http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png",
          new kakao.maps.Size(20, 27) // 마커 이미지 크기 조정
        );
        
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
          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(item.mapy, item.mapx),
            image: markerImage,
          });
    
          markers.push(marker);
    
          // Overlay 생성 (마커에 title 표시)
          const overlay = new kakao.maps.CustomOverlay({
            content: `<div class="sideOverlay">${item.title}</div>`,
            map: map,
            position: marker.getPosition(),
            yAnchor: 1.5, 
          });
    
          overlays.push(overlay);
    
          if (index > 0) {
            const linePath = [markers[index - 1].getPosition(), marker.getPosition()];
    
            const drawLine = new kakao.maps.Polyline({
              map: map,
              path: linePath,
              strokeWeight: 3,
              strokeColor: "#db4040",
              strokeOpacity: 1,
              strokeStyle: "solid",
            });
          }
        });
      }, [selectedItems, areaData.mapx, areaData.mapy, areaData.mlevel, day]);

    return (
        <div
            id="map"
            style={{
                width: 'auto',
                height: '600px',
                marginBottom:"120px"
            }}
        ></div>
    );
}

export default BigMapItem;