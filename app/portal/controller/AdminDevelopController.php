<?php

namespace app\portal\controller;

use cmf\controller\AdminBaseController;
use think\Db;

class AdminDevelopController extends AdminBaseController
{
	public function index()
	{
		return $this->fetch();
	}

	public function addHistory()
	{

	}
}