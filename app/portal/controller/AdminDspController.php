<?php

/**
 * DSP注册用户管理
 */

namespace app\portal\controller;

use cmf\controller\AdminBaseController;
use think\Db;

class AdminDspController extends AdminBaseController
{
	public function index()
	{
		return $this->fetch();
	}
}