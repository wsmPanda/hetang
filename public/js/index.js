$(function(){
	//datatables
	var dtOpt = {
		"processing": true,
        "ajax": "users",
        "columns": [
            { "data": "id" },
            { "data": "name" },
            { "data": "note" },
            { "data": "status" },
            { "data": "create-time" },
            { "data": "last-login-time" },
            { "data": "level" }
        ],
        "language": {
            "url": "dt_zh-cn.json"
        },
        "dom": "Bfrptpli",
        "buttons": [
	        {
	        	"text": "添加",
	        	"action": function (e, dt, node, config) {
	        		$('#form input[type="text"]').val(undefined)
					$('#modal').modal('show')
				}
	        },{
	        	"text": "修改",
	        	"action": function (e, dt, node, config) {
	        		var rowsData = table.rows('.selected').data();
	        		if (rowsData.length == 1) {
	        			// console.log($("#form").find('input[name="status"]'))
	        			// $("#form").find('input[name="create-time"]').val(["create-time"])
	        			$("#form .form-group").each(function(index, elem) {
	        				var name = $(elem).find('[name]:first-child').attr("name")
	        				console.log($(elem).find('[name='+name+']'))
	        				console.log(rowsData[0][name])
	        				$(elem).find('[name='+name+']').val([rowsData[0][name]])
	        			})
	        		}
					$('#modal').modal('show')
				}
	        },{
	        	"text": "删除",
	        	"action": function (e, dt, node, config) {
	        		var rowsData = table.rows('.selected').data();
	        		var rowsId = [],
	        			i = 0;
	        		while (rowsData[i]) {
	        			rowsId[i] = rowsData[i].id;
	        			i++;
	        		}
	        		console.log(typeof rowsId)
	        		$.ajax({
	        			url: '/users/delete',
	        			type: 'POST',
	        			data: {data: JSON.stringify(rowsId)}
	        		})
	        		.done(function() {
	        			table.ajax.reload();
	        		})
	        		.fail(function() {
	        			console.log("error");
	        		})
	        		.always(function() {
	        			console.log("complete");
	        		});
	        		
				}
	        }
	    ]
	};
	var table = $('#example').DataTable(dtOpt);
	$('#example')
        .removeClass( 'display' )
        .addClass('table table-striped table-bordered');
    //daterangepicker
    var dpOpt =  {
    	"locale": {
	        "format": "MM/DD/YYYY",
	        "separator": " - ",
	        "applyLabel": "应用",
	        "cancelLabel": "取消",
	        "fromLabel": "从",
	        "toLabel": "到",
	        "customRangeLabel": "自定义",
	        "weekLabel": "W",
	        "daysOfWeek": [
	            "周日",
	            "周一",
	            "周二",
	            "周三",
	            "周四",
	            "周五",
	            "周六"
	        ],
	        "monthNames": [
	            "一月",
	            "二月",
	            "三月",
	            "四月",
	            "五月",
	            "六月",
	            "七月",
	            "八月",
	            "九月",
	            "十月",
	            "十一月",
	            "十二月"
	        ],
	        "firstDay": 1
	    },
	    "singleDatePicker": true,
        "showDropdowns": true,
        "timePicker": true,
        "timePicker24Hour": true
	};
    $('input[name="create-time"]').daterangepicker(dpOpt);

    //select2
    $('#type').select2({
	    dropdownAutoWidth : true,
	    width: 'auto'
	});

	$('.modal-footer .btn-primary').click(function() {
		var dataObj = new FormData(document.querySelector("#form"))
		$.ajax({
			url: '/users/update',
			type: 'POST',
			data: dataObj,
			processData: false,
			contentType: false
		})
		.done(function(data) {
			table.ajax.reload();
			$('#modal').modal('hide')
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});

	$('#example tbody').on('click', 'tr', function() {
		$(this).toggleClass('selected');
	})
})