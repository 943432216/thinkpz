<?php

/**
 * 品专官网-后台留言管理
 */

namespace app\portal\controller;

use cmf\controller\AdminBaseController;

class AdminRecruitController extends AdminBaseController {
	public function index()
	{
		return $this->fetch();
	}

	public function add()
	{
		halt($_POST);
	}
}