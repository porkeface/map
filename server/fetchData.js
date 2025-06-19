
// 公共函数：加载数据并渲染
function loadScenicData(currentSpotName, viewer) {
    fetch('http://localhost:3000/api/jimei')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);
            const scenicSpots = data;
            const scenicNameElement = document.getElementById('scenicName');
            const scenicDescriptionElement = document.getElementById('scenicDescription');

            // 默认显示当前景点的信息
            const defaultSpot = scenicSpots.find(spot => spot.Name === currentSpotName);
            if (defaultSpot) {
                scenicNameElement.textContent = defaultSpot.Name;
                scenicDescriptionElement.textContent = defaultSpot.Description;
            } else {
                console.error(`未找到“${currentSpotName}”的数据`);
                scenicNameElement.textContent = '未找到景点';
                scenicDescriptionElement.textContent = '请检查数据库数据';
            }

        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('scenicName').textContent = '加载失败';
            document.getElementById('scenicDescription').textContent = '无法获取数据，请检查后端服务';
        });
}