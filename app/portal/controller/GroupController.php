<?php
/**
 * 品专官网 - 集团控制器
 */

namespace app\portal\controller;

use cmf\controller\HomeBaseController;

class GroupController extends HomeBaseController {
	public function index() 
	{
		return $this->fetch('/group');
	}

	public function aboutPz()
	{
		return $this->fetch('/about_pz');
	}

}