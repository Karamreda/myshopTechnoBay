var dtble;

$(document).ready(function () {
    loaddata();
});

function loaddata() {
    dtble = $("#mytable").DataTable({
        "ajax": {
            "url": "/Admin/Product/GetData"
        },
        "columns": [
            { "data": "name" },
            { "data": "description" },
            {
                "data": "price",
                "render": function (data) {
                    return data.toFixed(2) + " $";
                }
            },
            { "data": "category.name" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        <a href="/Admin/Product/Edit/${data}" class="btn btn-warning btn-sm me-2">
                            <i class="fa fa-edit"></i> Edit
                        </a>
                        <a onClick="DeleteItem('/Admin/Product/Delete/${data}')" class="btn btn-danger btn-sm">
                            <i class="fa fa-trash"></i> Delete
                        </a>
                    `;
                },
                "orderable": false,
                "searchable": false,
                "width": "20%"
            }
        ]
    });
}

function DeleteItem(url) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dtble.ajax.reload();
                    } else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}
