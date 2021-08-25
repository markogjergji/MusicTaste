
<h3 class="title" >Post</h3>

<form action=" {!! url('/post') !!}" method="POST">
@csrf
    <textarea id="post-field" autofocus name="text"></textarea>
    <input id="post-submit" type="submit" />
</form>