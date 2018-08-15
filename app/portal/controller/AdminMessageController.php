<?php
/**
 * 品专官网 - 留言模块
 */
namespace app\portal\controller;

use cmf\controller\AdminBaseController;
use think\Db;

class AdminMessageController extends AdminBaseController
{
	public function index()
	{
		return $this->fetch();
	}
}