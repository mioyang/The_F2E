// 日期顯示
$(document).ready(function () {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = d.getFullYear() + '/' +
        (('' + month).length < 2 ? '0' : '') + month + '/' +
        (('' + day).length < 2 ? '0' : '') + day;

    // 取代成當天日期
    $('p.date').text(output);
    return false;
});

// 按鈕ckeck事件
$('#addNew').on('click', function () {
    var contents = $('#event').val();
    var darggerSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cy = "7" cx = "9.5" r = "1" fill = "#999" ></circle><circle cy="7" cx="14" r="1" fill="#999"></circle><circle cy="12.5" cx="9.5" r="1" fill="#999"></circle><circle cy="12.5" cx="14" r="1" fill="#999"></circle><circle cy="18" cx="9.5" r="1" fill="#999"></circle><circle cy="18" cx="14" r="1" fill="#999"></circle></svg>';

    $('#listMain').prepend(`
        <div class="card border-0 mb-3">
            <div class="card-body pl-1 pr-3 d-flex align-items-center">
                <div class="dragger mr-1">${darggerSVG}</div>
                <button type="button" id="complete" class="btn btn-outline-check">
                <i class="fas fa-check"></i>
                </button>
                <div class="listContent ml-2">${contents}</div>
                <div class="actions ml-auto">
                <a href="#" class="btn btn-edit">
                    <i class="fas fa-pencil-alt"></i>
                </a>
                <a href="#" class="btn btn-delete">
                    <i class="fas fa-trash-alt"></i>
                </a>
                </div>
            </div>
        </div>
    `);

    $('#event').val('');
    return false;
});

// Sortable plugin 拖曳事件
$(document).ready(function () {
    var el = document.getElementById("listMain");
    Sortable.create(el, {
        // 參數設定[註1]
        disabled: false, // 關閉Sortable
        animation: 200,  // 物件移動時間(單位:毫秒)
        handle: ".dragger",  // 可拖曳的區域
        filter: ".ignore",  // 過濾器，不能拖曳的物件
        preventOnFilter: true, // 當過濾器啟動的時候，觸發event.preventDefault()
        draggable: ".card",  // 可拖曳的物件
        ghostClass: "sortable-ghost",  // 拖曳時，給予物件的類別
        chosenClass: "sortable-chosen",  // 選定時，給予物件的類別
        forceFallback: false  // 忽略HTML5 DnD
    });
});