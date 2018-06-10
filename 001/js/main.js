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
    return false;
});

// 新增事件
$('#addNew').on('click', function addEvent() {
    // 新增事件
    var contents = $('#event').val();
    var darggerSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cy = "7" cx = "9.5" r = "1" fill = "#999" ></circle><circle cy="7" cx="14" r="1" fill="#999"></circle><circle cy="12.5" cx="9.5" r="1" fill="#999"></circle><circle cy="12.5" cx="14" r="1" fill="#999"></circle><circle cy="18" cx="9.5" r="1" fill="#999"></circle><circle cy="18" cx="14" r="1" fill="#999"></circle></svg>';

    $('#listMain').prepend(`
        <div class="card border-0 mb-3">
            <div class="card-body pl-1 pr-3 d-flex align-items-center">
                <div class="dragger mr-1">${darggerSVG}</div>
                <a id="complete" class="btn btn-outline-check">
                    <i class="fas fa-check"></i>
                </a>
                <div class="listContent ml-2"><p class="mb-0">${contents}</p></div>
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


    // 刪除事件
    $('.btn-delete').on('click', function () {
        $(this).closest('.card').remove();
    });

    return false;
});





$(document).ready(function () {
    // 刪除預設事件
    $('.btn-delete').on('click', function () {
        $(this).closest('.card').remove();
    });

    // 點下完成按鈕事件
    $('.listArea #listMain').on('click', '#complete', function () {

        // 找到點擊的按鈕
        let button = $(this);

        // 找到相對應的文字
        let index_click = $('a#complete').index(this);
        let linethrough_text = $('.card-body .listContent').eq(index_click).find('p');

        $(button).toggleClass('checked');
        $(linethrough_text).toggleClass('line-through');

        // 隱藏編輯按鈕
        // $('a.btn-edit').toggleClass('hidden');
    });

    // 編輯已輸入的事件
    $('.btn-edit').on('click', function () {

        let index_click = $('a.btn-edit').index(this);
        var current = $('.card-body .listContent').eq(index_click).find('p').text();
        console.log(current);
    });
    return false;
});


